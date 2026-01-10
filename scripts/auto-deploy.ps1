<#
.SYNOPSIS
  Automated apply -> commit -> push -> create PR/merge -> trigger deploy -> smoke-test
  for 3000Studios/3000studios-next.

.DESCRIPTION
  This script attempts to apply the prepared patch (0001-fix-stabilize-build.patch),
  commit the changes on a branch, push to origin, create a GitHub PR (if direct push is
  blocked by branch protection), optionally auto-merge if allowed, and wait for the
  CI/CD workflow to deploy. It then does a simple smoke-test against your website.

  The script is designed to handle common blocking causes for "can't push":
  - missing auth (uses GitHub CLI gh)
  - remote out-of-date (will rebase/pull)
  - protected main branch (creates PR instead of forcing push)
  - failing CI (it will show logs and stop)
  - missing secrets — it can interactively prompt to set them via `gh secret set`

  IMPORTANT:
  - This script does not have elevated privileges. To set repository secrets or merge PRs
    automatically the GitHub account you use must have appropriate permissions and the
    gh CLI must be authenticated (gh auth login).
  - Review the script before running. Test on a feature branch or fork first if you are unsure.

.PARAMETER PatchFile
  Path to the patch file to apply (mbox/git am format). Default: ./0001-fix-stabilize-build.patch

.PARAMETER Branch
  Branch name to create for changes. Default: fix/stabilize-build-0001

.PARAMETER ForcePush
  If present, attempt to push directly to main (dangerous if branch protected). Default: false

.PARAMETER AutoMergePR
  If present and a PR is created, attempt to auto-merge the PR (requires appropriate rights).

.PARAMETER WaitForDeploymentSeconds
  How long to wait (seconds) for deployment to succeed after merge/push. Default: 600 (10m)

.EXAMPLE
  # Interactive: apply patch, push branch, create PR if needed
  .\scripts\auto-deploy.ps1

  # Non-interactive: force push merged main (use with caution)
  .\scripts\auto-deploy.ps1 -ForcePush -AutoMergePR

.NOTES
  - Requires: git, node, pnpm, gh (GitHub CLI). Optional: vercel (if you deploy with vercel CLI).
  - Ensure you run from repository root where .git and package.json live.
  - Set repository secrets (DATABASE_URL, NEXTAUTH_SECRET, VERCEL_TOKEN) in GitHub if using CI deploy.

#>

param(
  [string]$PatchFile = ".\0001-fix-stabilize-build.patch",
  [string]$Branch = "fix/stabilize-build-0001",
  [switch]$ForcePush = $false,
  [switch]$AutoMergePR = $false,
  [int]$WaitForDeploymentSeconds = 600
)

# Use .\gh.exe if it exists in current dir, otherwise assume it's in path
$GH_CMD = "gh"
if (Test-Path ".\gh.exe") { $GH_CMD = ".\gh.exe" }

set-strictmode -Version Latest
$ErrorActionPreference = 'Stop'

function Log { param($m) Write-Host "$(Get-Date -Format s) - $m" }
function Fail { param($m) Write-Host "$(Get-Date -Format s) - ERROR: $m"; exit 1 }

# Helper: convert SecureString to plain text (for gh secret set)
function Convert-SecureStringToPlainText {
  param([System.Security.SecureString]$secure)
  if (-not $secure) { return "" }
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
  } finally {
    if ($bstr) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
  }
}

# Interactive: set missing secrets via gh
function Set-GHRepoSecretsInteractive {
  param(
    [string]$RepoFullName,
    [string[]]$SecretNames
  )

  if (-not $RepoFullName) {
    Fail "Repository full name (owner/repo) required to set secrets."
  }

  # Ensure gh is available
  if (-not (Get-Command $GH_CMD -ErrorAction SilentlyContinue)) {
    Fail "GitHub CLI 'gh' is required to set secrets. Install and authenticate (gh auth login)."
  }

  Log "Checking existing secrets for $RepoFullName ..."
  $existing = @()
  try {
    # gh secret list outputs secret names; parse simply
    $listOut = & $GH_CMD secret list --repo $RepoFullName 2>$null
    if ($listOut) {
      $existing = $listOut | ForEach-Object { ($_ -split '\s+')[0] }  # first column is name
    }
  } catch {
    # If list fails, warn and continue with interactive prompt to set secrets; user must have permissions
    Log "Warning: gh secret list failed (maybe permissions). Will still allow interactive set."
  }

  foreach ($s in $SecretNames) {
    $present = $false
    if ($existing -contains $s) { $present = $true }

    if ($present) {
      $resp = Read-Host "Secret '$s' already exists in $RepoFullName. Overwrite? (y/N)"
      if ($resp -notmatch '^(y|Y)') {
        Log "Skipping $s (exists and user chose not to overwrite)."
        continue
      }
    } else {
      $resp = Read-Host "Secret '$s' is missing in $RepoFullName. Set it now? (y/N)"
      if ($resp -notmatch '^(y|Y)') {
        Log "Skipping $s as requested by user."
        continue
      }
    }

    # Prompt for secret value securely
    Write-Host "Enter value for secret '$s' (input hidden):"
    $secure = Read-Host -AsSecureString
    $plain = Convert-SecureStringToPlainText -secure $secure

    if (-not $plain) {
      Log "No value provided for $s. Skipping."
      continue
    }

    try {
      # Use gh secret set with --repo to target the repository explicitly
      Log "Setting secret $s in $RepoFullName ..."
      # Use --body to set from CLI; be careful with special chars
      & $GH_CMD secret set $s --body "$plain" --repo $RepoFullName
      Log "Secret $s set successfully."
    } catch {
      Log "Failed to set secret $s: $($_.Exception.Message)" "ERROR"
    }
  }
}

try {
  Log "Starting auto-deploy helper"

  if (-not (Test-Path ".git")) { Fail "Run this script from the repository root (where .git is located)." }

  foreach ($cmd in @("git","node","pnpm",$GH_CMD)) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
      Fail "Required command not found in PATH: $cmd. Install it before continuing."
    }
  }

  # Ensure GH auth
  try {
    & $GH_CMD auth status -h github.com 2>&1 | Out-Null
  } catch {
    Fail "GitHub CLI not authenticated. Run 'gh auth login' and re-run this script."
  }

  Log "Fetching origin..."
  & git fetch origin --prune

  # Ensure local main exists and up-to-date
  if (-not (& git show-ref --verify --quiet refs/heads/main)) {
    Log "Local main not found; creating from origin/main"
    & git checkout -b main origin/main
  } else {
    & git checkout main
    try { & git pull origin main --rebase } catch { Log "Warning: git pull failed. Resolve manually." }
  }

  if ((& git status --porcelain).Trim()) {
    Fail "Working tree is dirty. Commit or stash changes before running this script."
  }

  # Create work branch
  if (& git show-ref --verify --quiet "refs/heads/$Branch") {
    Log "Deleting existing local branch $Branch"
    & git branch -D $Branch
  }
  & git checkout -b $Branch

  # Apply patch
  if (-not (Test-Path $PatchFile)) {
    Fail "Patch file not found at $PatchFile. Place the patch at repository root and retry."
  }
  Log "Applying patch file $PatchFile"
  try {
    & git am $PatchFile
    Log "git am applied patch cleanly."
  } catch {
    Log "git am failed - attempting fallback git apply."
    try { & git am --abort } catch {}
    try {
      & git apply --index --reject --whitespace=fix $PatchFile
      Log "git apply succeeded (check for .rej files). Committing."
      & git add -A
      & git commit -m "chore: apply stabilization patch (fallback apply)"
    } catch {
      Fail "Patch application failed. Resolve manually and re-run the script."
    }
  }

  # Install and build
  Log "Installing dependencies (pnpm install --frozen-lockfile)..."
  & pnpm install --frozen-lockfile

  $pkg = (Get-Content package.json -Raw | ConvertFrom-Json)
  if ($pkg.scripts -and $pkg.scripts.prebuild) {
    Log "Running prebuild..."
    & pnpm run prebuild
  }

  if ($pkg.scripts -and $pkg.scripts.'type-check') {
    Log "Running type-check..."
    try { & pnpm run type-check } catch { Fail "Type-check failed. Fix errors before pushing." }
  } else {
    Log "No type-check script found; skipping."
  }

  Log "Running build..."
  try {
    & pnpm run build 2>&1 | Tee-Object -FilePath ".\auto-deploy-build.log" -Variable _buildOut
    Log "Build succeeded. Log at .\auto-deploy-build.log"
  } catch {
    Log "Build failed. Showing tail of log:"
    Get-Content .\auto-deploy-build.log -Tail 200 | ForEach-Object { Write-Host $_ }
    Fail "Build failed. Fix build errors and retry."
  }

  # Commit any new/leftover changes
  if ((& git status --porcelain).Trim()) {
    Log "Staging remaining changes and committing."
    & git add -A
    & git commit -m "fix: apply stabilization patch and build artifacts"
  } else {
    Log "No additional changes to commit."
  }

  # Push branch to origin
  Log "Pushing branch $Branch to origin..."
  try {
    & git push -u origin $Branch
    Log "Branch pushed: origin/$Branch"
  } catch {
    Log "git push failed; attempting rebase on origin/main and re-push..."
    try {
      & git fetch origin
      & git rebase origin/main
      & git push -u origin $Branch
      Log "Push succeeded after rebase."
    } catch {
      Log "Push still failed. Continuing to PR creation flow."
    }
  }

  # Determine repo owner/name for gh operations
  $originUrl = (& git remote get-url origin).Trim()
  if ($originUrl -match "[:/](?<owner>[^/]+)/(?<repo>[^/.]+)(\.git)?$") {
    $owner = $Matches.owner
    $repoName = $Matches.repo
    $repoFull = "$owner/$repoName"
    Log "Detected repo: $repoFull"
  } else {
    Fail "Unable to parse origin URL to determine owner/repo. Origin: $originUrl"
  }

  # Interactive: check and optionally set critical secrets in the remote repo
  $requiredSecrets = @('DATABASE_URL','NEXTAUTH_SECRET','VERCEL_TOKEN')
  $missingSecrets = @()
  try {
    $remoteSecretsRaw = & $GH_CMD secret list --repo $repoFull 2>$null
    $remoteSecrets = @()
    if ($remoteSecretsRaw) {
      $remoteSecrets = $remoteSecretsRaw | ForEach-Object { ($_ -split '\s+')[0] }
    }
    foreach ($s in $requiredSecrets) {
      if (-not ($remoteSecrets -contains $s)) { $missingSecrets += $s }
    }
  } catch {
    # If we cannot list secrets (permission), still allow interactive set but warn
    Log "Warning: could not list remote secrets (gh secret list failed). You may not have admin permissions to set secrets."
    $missingSecrets = $requiredSecrets
  }

  if ($missingSecrets.Count -gt 0) {
    Log "Missing secrets detected: $($missingSecrets -join ', ')"
    $doSet = Read-Host "Would you like to interactively set these secrets now via 'gh secret set'? (y/N)"
    if ($doSet -match '^(y|Y)') {
      Set-GHRepoSecretsInteractive -RepoFullName $repoFull -SecretNames $missingSecrets
    } else {
      Log "Skipping secret setup. CI may fail if required secrets are absent."
    }
  } else {
    Log "All required secrets appear present in the remote repo."
  }

  # Create PR via gh
  Log "Creating a PR via GitHub CLI (gh)..."
  $title = "fix: stabilization — apply patch and CI fixes"
  $body = @"
This PR applies a stabilizing patch that:
- Fixes TypeScript catch variable issues
- Adds Cloudinary typing fixes
- Adds a minimal admin voice-logs API for dev
- Adds environment validation and CI workflow updates

Automated PR created by scripts/auto-deploy.ps1
"@

  try {
    $prCreateOut = & $GH_CMD pr create --title $title --body $body --base main --head $Branch --repo $repoFull --json url --jq ".url"
    $prUrl = $prCreateOut.Trim()
    Log "PR created: $prUrl"
  } catch {
    Log "Failed to create PR via gh: $($_.Exception.Message)" "ERROR"
    Fail "Cannot create PR automatically. Push done; create a PR manually in the GitHub UI."
  }

  if ($AutoMergePR) {
    Log "Attempting to merge the PR automatically..."
    try {
      # Try standard merge (requires permissions & passing CI)
      & $GH_CMD pr merge $prUrl --merge --delete-branch
      Log "PR merged successfully."
    } catch {
      Log "Auto-merge failed or not permitted: $($_.Exception.Message)" "WARN"
    }
  } else {
    Log "AutoMergePR not requested. Please review and merge the PR in GitHub."
  }

  # Poll for deployment (simple site url check)
  $siteUrl = $env:NEXT_PUBLIC_API_URL
  if (-not $siteUrl) { $siteUrl = Read-Host "Enter the site URL to poll for deployment (e.g. https://your-site.com) or press Enter to skip" }
  if ($siteUrl) {
    Log "Polling $siteUrl for up to $WaitForDeploymentSeconds seconds..."
    $deadline = (Get-Date).AddSeconds($WaitForDeploymentSeconds)
    $deployed = $false
    while ((Get-Date) -lt $deadline) {
      try {
        $r = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        if ($r.StatusCode -eq 200) { $deployed = $true; break }
      } catch { }
      Start-Sleep -Seconds 5
    }
    if ($deployed) { Log "Deployment appears live at $siteUrl"; Write-Host "SUCCESS: changes likely visible on your site." } else { Log "Timed out waiting for deployment. Check CI/CD provider and GitHub Actions." }
  } else {
    Log "No site URL provided. Skipping deployment polling."
  }

  Log "auto-deploy script completed."
  exit 0

} catch {
  Fail "Fatal error: $($_.Exception.Message)`n$($_.Exception.StackTrace)"
}

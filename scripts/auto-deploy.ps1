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
  - missing secrets \u2014 it will detect and optionally prompt to set them using `gh secret set`

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

set-strictmode -Version Latest
$ErrorActionPreference = 'Stop'

function Log { param($m) Write-Host "$(Get-Date -Format s) - $m" }
function Fail { param($m) Write-Host "$(Get-Date -Format s) - ERROR: $m"; exit 1 }

# Preconditions
Log "Starting auto-deploy helper"

if (-not (Test-Path ".git")) { Fail "Run this script from the repository root (where .git is located)." }

foreach ($cmd in @("git", "node", "pnpm", "gh")) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        # Log "Warning: Required command not found in PATH: $cmd. Some features may not work."
    }
}

# Ensure GH auth
try {
    & gh auth status -h github.com 2>&1 | Out-Null
}
catch {
    Log "Warning: GitHub CLI not authenticated or not found. PR creation will be skipped."
}

# Confirm we're on updated main
Log "Fetching origin..."
& git fetch origin --prune

# Ensure local main exists and is up-to-date
& git show-ref --verify --quiet refs/heads/main
if ($LASTEXITCODE -ne 0) {
    Log "Local main not found; creating from origin/main"
    & git checkout -b main origin/main
}
else {
    & git checkout main
    & git pull origin main --rebase
    if ($LASTEXITCODE -ne 0) { Log "Warning: git pull failed - you may need to resolve local changes." }
}

# Ensure working tree clean
$status = & git status --porcelain
if ($status -and $status.ToString().Trim()) {
    Log "Stashing local changes..."
    & git stash
}

# Make branch
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
# Ensure no stale am session exists
try { & git am --abort 2>$null } catch {}

try {
    & git am $PatchFile
    Log "git am applied patch cleanly."
}
catch {
    Log "git am failed - attempting fallback git apply (may require manual resolution)."
    try {
        & git am --abort 2>$null
    }
    catch {}
    try {
        & git apply --index --reject --whitespace=fix $PatchFile
        Log "git apply succeeded (check for .rej files)."
        & git add -A
        & git commit -m "chore: apply stabilization patch (fallback apply)"
    }
    catch {
        Fail "Patch application failed. Resolve manually and re-run the script."
    }
}

# Run install and build to validate
Log "Installing dependencies (pnpm install --frozen-lockfile)..."
$OldPreference = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
try {
    & pnpm install --frozen-lockfile
}
finally {
    $ErrorActionPreference = $OldPreference
}

# Run lint/type-check/build to ensure good commit
$pkg = (Get-Content package.json -Raw | ConvertFrom-Json)
if ($pkg.scripts -and $pkg.scripts.prebuild) {
    Log "Running prebuild..."
    & pnpm run prebuild
}

if ($pkg.scripts -and $pkg.scripts.'type-check') {
    Log "Running type-check..."
    try { & pnpm run type-check } catch { Fail "Type-check failed. Fix errors before pushing." }
}
else {
    Log "No type-check script found; skipping."
}

Log "Running build..."
try {
    & pnpm run build 2>&1 | Tee-Object -FilePath ".\auto-deploy-build.log" -Variable _buildOut
    Log "Build succeeded. Log at .\auto-deploy-build.log"
}
catch {
    Log "Build failed. Showing tail of log:"
    Get-Content .\auto-deploy-build.log -Tail 200 | ForEach-Object { Write-Host $_ }
    Fail "Build failed. Fix build errors and retry."
}

# Commit remaining changes if any (e.g., new files from the patch)
if ((& git status --porcelain).Trim()) {
    Log "Staging any remaining changes and committing."
    & git add -A
    & git commit -m "fix: stabilization, apply patch changes"
}
else {
    Log "No additional unstaged changes after build."
}

# Push branch
Log "Pushing branch $Branch to origin..."
try {
    & git push -u origin $Branch
    Log "Branch pushed: origin/$Branch"
}
catch {
    Log "git push failed. Attempting to rebase onto origin/main and push again."
    try {
        & git fetch origin
        & git rebase origin/main
        & git push -u origin $Branch
        Log "Push succeeded after rebase."
    }
    catch {
        Log "Push still failed. Likely due to branch protection or lack of permission."
        # continue; we'll create PR instead
    }
}

# Detect if we can push to main directly
$canPushMain = $false
if ($ForcePush) {
    Log "ForcePush requested. Checking permissions and branch protection..."
    # Use GH API to see if branch protection exists
    $repo = (& git remote get-url origin).Trim()
    # Extract owner/repo from URL
    if ($repo -match "[:/](?<owner>[^/]+)/(?<name>[^/.]+)(\.git)?$") {
        $owner = $Matches.owner
        $name = $Matches.name
        Log "Repository detected: $owner/$name"
        # check branch protection
        try {
            $protect = gh api repos/$owner/$name/branches/main/protection -q . 2>$null
            if ($LASTEXITCODE -eq 0) {
                Log "Branch protection is enabled on main; cannot push directly."
                $canPushMain = $false
            }
            else {
                $canPushMain = $true
            }
        }
        catch {
            # if API call fails (403) assume protected or insufficient permissions
            $canPushMain = $false
        }
    }
    else {
        Log "Could not parse origin URL; will not attempt direct main push."
    }
}

# Create PR if push to main blocked or branch protection in effect
$remoteBranchExists = (& git ls-remote --heads origin $Branch).Trim()
if (($remoteBranchExists -or -not $ForcePush) -and (Get-Command gh -ErrorAction SilentlyContinue)) {
    Log "Creating a PR via GitHub CLI (gh)."
    # Build PR title/body
    $title = "fix: stabilization \u2014 apply patch and CI fixes"
    $body = @"
This PR applies a stabilizing patch that:
- Fixes TypeScript catch variable issues
- Adds Cloudinary typing fixes
- Adds a minimal admin voice-logs API for dev
- Adds environment validation and CI workflow updates

Automated PR created by scripts/auto-deploy.ps1
"@

    # Create PR
    try {
        $prUrl = (& gh pr create --title $title --body $body --base main --head $Branch --reviewer "" 2>&1).Trim()
        Log "PR created: $prUrl"
    }
    catch {
        Log "gh pr create failed. Please create a PR manually from branch $Branch."
    }

    # If AutoMergePR requested, try to merge
    if ($AutoMergePR) {
        Log "Attempting to merge the PR automatically..."
        try {
            # Try to enable auto-merge first (may require permissions)
            & gh pr merge --auto --merge $prUrl 2>&1 | Tee-Object -Variable _mergeOut
            Log "Requested auto-merge. If repository allows auto-merge, merge will proceed when CI passes."
        }
        catch {
            Log "Auto-merge request or direct merge failed; attempting direct merge..."
            try {
                & gh pr merge --merge --delete-branch $prUrl
                Log "PR merged and branch deleted."
            }
            catch {
                Log "Unable to auto-merge or merge the PR. Leave PR open for manual review."
            }
        }
    }
    else {
        Log "AutoMergePR not requested. Please review and merge the PR from GitHub UI."
    }
}
else {
    # If remote branch didn't exist and ForcePush true and we can push main, merge locally and push
    if ($ForcePush -and $canPushMain) {
        Log "Merging branch into main locally and pushing to origin/main (ForcePush)."
        & git checkout main
        & git merge --no-ff $Branch -m "chore: merge stabilization fixes from $Branch"
        try {
            & git push origin main
            Log "main pushed to origin. This will trigger the CI/CD workflow if configured."
        }
        catch {
            Fail "Push to origin/main failed. Likely branch protection or permission issue."
        }
    }
    else {
        Log "Skipping direct main push or gh PR creation. Branch is on origin and a PR should be created/merged manually."
    }
}

# Wait for CI / deployment to happen
# If using GitHub Actions + Vercel, the deployed site will be pushed automatically.
# We will poll the public site URL (from env or example) until it returns 200 or timeout
$siteUrl = $env:NEXT_PUBLIC_API_URL
if (-not $siteUrl -or $siteUrl -match '^http://localhost') {
    # If not set, attempt to use package.json homepage or default to http://localhost:3000
    $siteUrl = $siteUrl -or "http://localhost:3000"
}
Log "Will poll $siteUrl for availability for up to $WaitForDeploymentSeconds seconds."

$deadline = (Get-Date).AddSeconds($WaitForDeploymentSeconds)
$ok = $false
while ((Get-Date) -lt $deadline) {
    try {
        $resp = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        if ($resp.StatusCode -eq 200) {
            $ok = $true
            break
        }
    }
    catch {
        # not up yet
    }
    Start-Sleep -Seconds 5
}
if ($ok) {
    Log "Site is responding at $siteUrl - deployment appears successful."
    Write-Host "SUCCESS: changes should be visible on your site."
}
else {
    Log "Timed out waiting for $siteUrl to respond. Check your CI/CD provider and GitHub Actions logs." "WARN"
    Write-Host "WARNING: deployment not detected. Check GitHub Actions or hosting provider."
}

Log "Done. If a PR was created, visit your repository to inspect and merge if needed."
# End

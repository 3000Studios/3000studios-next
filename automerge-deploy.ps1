# automerge-deploy.ps1
# Usage (from PowerShell 7+):
#   pwsh -ExecutionPolicy Bypass -File .\automerge-deploy.ps1

$ErrorActionPreference = "Stop"

function Exec($cmd) {
  Write-Host "`n> $cmd"
  iex $cmd
}

# --- Locate repo root (assumes script is stored in repo root) ---
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoRoot

Exec "git rev-parse --is-inside-work-tree"
Exec "git status --porcelain=v1"

# --- Update main safely (no rebase) ---
Exec "git fetch --all --prune"
Exec "git checkout main"
Exec "git pull"

# --- Optional: merge PRs if GH CLI is present ---
$HasGh = $false
try { Exec "gh --version" | Out-Null; $HasGh = $true } catch { $HasGh = $false }

if ($HasGh) {
  try {
    Exec "gh auth status"
    $prs = (gh pr list --state open --json number --jq '.[].number') -split "`n" | Where-Object { $_ -match '^\d+$' }
    foreach ($pr in $prs) {
      Write-Host "`n--- Merging PR #$pr ---"
      # merge-commit keeps history; switch to squash if you want: gh pr merge $pr --squash --delete-branch
      Exec "gh pr merge $pr --merge --delete-branch"
      Exec "git pull"
    }
  } catch {
    Write-Warning "GH CLI present but not authenticated/usable. Skipping PR merges. Error: $($_.Exception.Message)"
  }
} else {
  Write-Warning "GH CLI not found. Skipping PR merges."
}

# --- Install + quality gates ---
# Detect package manager
$hasPnpm = $false
try { Exec "pnpm -v" | Out-Null; $hasPnpm = $true } catch { $hasPnpm = $false }

if (Test-Path ".\pnpm-lock.yaml" -and $hasPnpm) {
  Exec "pnpm install"
  if (Test-Path ".\package.json") { Exec "pnpm -s lint" }
  if (Test-Path ".\package.json") { Exec "pnpm -s build" }
} elseif (Test-Path ".\package-lock.json") {
  Exec "npm ci"
  Exec "npm run -s lint"
  Exec "npm run -s build"
} elseif (Test-Path ".\yarn.lock") {
  Exec "yarn install --frozen-lockfile"
  Exec "yarn lint"
  Exec "yarn build"
} else {
  throw "No recognized lockfile found. Repo needs dependency strategy cleanup."
}

# --- Commit any fixes made by tools (if any) ---
$dirty = (git status --porcelain=v1)
if ($dirty) {
  Exec "git add -A"
  Exec "git commit -m ""chore: automated fixes + build green"""
  Exec "git push origin main"
}

# --- Vercel deploy (requires VERCEL_TOKEN in environment) ---
if (-not $env:VERCEL_TOKEN) {
  Write-Warning "VERCEL_TOKEN not set. Set it, then rerun this script to deploy."
  exit 0
}

Exec "vercel --version"
Exec "vercel pull --yes --environment=production"
Exec "vercel deploy --prod"

Write-Host "`nDONE: main updated + deployed."

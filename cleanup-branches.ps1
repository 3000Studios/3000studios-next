# Branch Cleanup Script (PowerShell)
# Run this after the PR is merged to main to delete all merged branches

Write-Host "🧹 Starting branch cleanup process..." -ForegroundColor Cyan
Write-Host ""

# Ensure we're on main
Write-Host "1️⃣ Switching to main branch..." -ForegroundColor Yellow
git checkout main

# Pull latest changes
Write-Host "2️⃣ Pulling latest changes from origin/main..." -ForegroundColor Yellow
git pull origin main

# Delete local branches (ignore errors if branches don't exist locally)
Write-Host "3️⃣ Deleting local branches..." -ForegroundColor Yellow
$branchesToDelete = @(
    "3000Studios-patch-1",
    "copilot/add-branch-protection-rules",
    "copilot/add-collaborator-feature",
    "copilot/add-hybrid-performance-rig",
    "copilot/add-permanent-revenue-lock-rule",
    "copilot/add-readme-and-license",
    "copilot/add-revenue-lock-ci-check",
    "copilot/add-shadow-prime-self-check",
    "copilot/auto-merge-pull-requests",
    "copilot/automationadd-ci-sync-deploy",
    "copilot/bring-repo-to-production-grade",
    "copilot/check-and-deploy-to-production",
    "copilot/configure-branch-protection",
    "copilot/deploy-all-features",
    "copilot/deploy-yml-changes",
    "copilot/explain-advanced-git-commands",
    "copilot/finalize-open-pull-requests",
    "copilot/fix-and-improve-system",
    "copilot/fix-node-version-warning",
    "copilot/fix-pull-request-issue",
    "copilot/fix-repo-architecture-errors",
    "copilot/list-latest-open-pull-requests",
    "copilot/prepare-production-readiness",
    "copilot/resolve-all-commits-and-branches",
    "copilot/retrieve-login-credentials-request",
    "copilot/sub-pr-10",
    "copilot/sync-local-workspace-with-github",
    "copilot/update-best-options",
    "copilot/update-main-with-all-branches",
    "copilot/update-password-and-login-link",
    "copilot/update-vcopilot-instructions",
    "dependabot/npm_and_yarn/npm_and_yarn-a9e5fb3b87",
    "merge-test",
    "vercel/install-vercel-web-analytics-f-k49rhc"
)

foreach ($branch in $branchesToDelete) {
    $exists = git show-ref --verify --quiet "refs/heads/$branch" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Deleting local branch: $branch" -ForegroundColor Gray
        git branch -D $branch 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "    (Already deleted or doesn't exist)" -ForegroundColor DarkGray
        }
    }
}

# Delete remote branches
Write-Host ""
Write-Host "4️⃣ Deleting remote branches..." -ForegroundColor Yellow
foreach ($branch in $branchesToDelete) {
    $remoteExists = git ls-remote --exit-code --heads origin $branch 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Deleting remote branch: $branch" -ForegroundColor Gray
        git push origin --delete $branch 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "    (Already deleted or doesn't exist)" -ForegroundColor DarkGray
        }
    }
}

# Prune remote tracking branches
Write-Host ""
Write-Host "5️⃣ Pruning remote tracking branches..." -ForegroundColor Yellow
git remote prune origin

# Show remaining branches
Write-Host ""
Write-Host "6️⃣ Verification - Remaining branches:" -ForegroundColor Yellow
git branch -a

Write-Host ""
Write-Host "✅ Branch cleanup complete!" -ForegroundColor Green
$branchCount = (git branch -a | Measure-Object).Count
Write-Host "📊 Final branch count: $branchCount" -ForegroundColor Green

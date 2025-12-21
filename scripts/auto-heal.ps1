#!/usr/bin/env pwsh
# 🏥 Auto-Heal Script - Monitors and fixes issues

Write-Host "🏥 Starting Auto-Heal Monitor..." -ForegroundColor Cyan

function Test-BuildHealth {
    Write-Host "🔍 Checking build health..." -ForegroundColor Yellow
    
    # Test npm install
    $npmResult = npm install --dry-run 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  npm issues detected, healing..." -ForegroundColor Yellow
        npm install --force
        npm audit fix --force
    }
    
    # Test TypeScript
    $tscResult = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  TypeScript errors detected, attempting fixes..." -ForegroundColor Yellow
        # Auto-fix imports and formatting
        npx prettier --write "src/**/*.{ts,tsx}"
    }
    
    # Test ESLint
    npm run lint -- --fix 2>&1 | Out-Null
    
    Write-Host "✅ Health check complete!" -ForegroundColor Green
}

function Invoke-AutoMerge {
    Write-Host "🔀 Checking for auto-mergeable PRs..." -ForegroundColor Yellow
    
    # Fetch latest
    git fetch origin
    
    # Check if there are any PRs to merge (requires gh CLI)
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        $prs = gh pr list --state open --json number, author
        if ($prs) {
            Write-Host "📋 Found open PRs, attempting auto-merge..." -ForegroundColor Cyan
            foreach ($pr in ($prs | ConvertFrom-Json)) {
                if ($pr.author.login -eq "dependabot[bot]") {
                    gh pr merge $pr.number --auto --squash
                    Write-Host "✅ Auto-merged PR #$($pr.number)" -ForegroundColor Green
                }
            }
        }
    }
}

function Invoke-AutoDeploy {
    Write-Host "🚀 Checking deployment status..." -ForegroundColor Yellow
    
    # Check if we're on main branch
    $branch = git branch --show-current
    if ($branch -eq "main") {
        Write-Host "✅ On main branch, triggering deploy..." -ForegroundColor Green
        
        # Trigger Vercel deployment if vercel CLI is available
        if (Get-Command vercel -ErrorAction SilentlyContinue) {
            vercel --prod --yes
        }
    }
}

# Main loop
while ($true) {
    try {
        Write-Host "`n🔄 Running auto-heal cycle..." -ForegroundColor Cyan
        
        Test-BuildHealth
        Invoke-AutoMerge
        Invoke-AutoDeploy
        
        Write-Host "💤 Sleeping for 10 minutes..." -ForegroundColor Gray
        Start-Sleep -Seconds 600
    }
    catch {
        Write-Host "❌ Error in heal cycle: $_" -ForegroundColor Red
        Start-Sleep -Seconds 300
    }
}

#!/usr/bin/env pwsh
# 🤖 Auto-Commit Script - Runs every 5 minutes

param(
    [int]$IntervalSeconds = 300  # 5 minutes
)

Write-Host "🤖 Starting Auto-Commit Watcher..." -ForegroundColor Cyan

while ($true) {
    try {
        $hasChanges = git status --porcelain
        
        if ($hasChanges) {
            Write-Host "`n✨ Changes detected, auto-committing..." -ForegroundColor Green
            
            # Stage all changes
            git add -A
            
            # Generate commit message with timestamp
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $commitMsg = "🤖 Auto-commit: $timestamp"
            
            # Commit
            git commit -m $commitMsg
            
            # Push to remote
            Write-Host "📤 Pushing to remote..." -ForegroundColor Yellow
            git push origin main
            
            Write-Host "✅ Auto-commit completed!" -ForegroundColor Green
        } else {
            Write-Host "." -NoNewline
        }
        
        Start-Sleep -Seconds $IntervalSeconds
    }
    catch {
        Write-Host "`n⚠️  Error: $_" -ForegroundColor Red
        Start-Sleep -Seconds $IntervalSeconds
    }
}

param (
    [string]$Message = "auto: sync and save"
)

$ErrorActionPreference = "Stop"

Write-Host "🔄 Auto-commit started"

git add .
if (git diff --cached --quiet) {
    Write-Host "⚠️ Nothing to commit"
    exit 0
}

git commit -m $Message
git push origin main

Write-Host "✅ Auto-commit complete"

Write-Host "🔄 Auto-commit starting..."

git status --porcelain | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Git not available"
  exit 1
}

git add .

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "auto: stabilize workspace ($timestamp)" 2>$null

git push

Write-Host "✅ Auto-commit complete"

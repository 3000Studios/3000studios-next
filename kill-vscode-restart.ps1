# ============================================================
# KILL EXTRA VS CODE PROCESSES & RESET WORKSPACE
# ============================================================

Write-Host "🔪 Killing extra VS Code processes..." -ForegroundColor Red

# Kill all Code.exe processes
Get-Process | Where-Object { $_.ProcessName -like "*Code*" } | Stop-Process -Force

Write-Host "✅ All VS Code processes terminated" -ForegroundColor Green
Write-Host "⏳ Wait 5 seconds before reopening..." -ForegroundColor Yellow

Start-Sleep -Seconds 5

# Reopen ONLY this workspace
code "C:\DEV\3000studios-next"

Write-Host "✅ Single workspace opened" -ForegroundColor Green

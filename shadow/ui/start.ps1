# Shadow Command Center UI — Windows Launcher
# Starts the UI server and opens browser

Write-Host "🟪 SHADOW COMMAND CENTER — STARTING" -ForegroundColor Magenta

# Start UI server
Start-Process node -ArgumentList "server.js" -WorkingDirectory "C:\Users\MrJws\3000studios-next\shadow\ui" -WindowStyle Hidden

# Wait for server to start
Start-Sleep -Seconds 2

# Open browser
Write-Host "Opening Shadow UI at http://localhost:3333" -ForegroundColor Cyan
Start-Process "http://localhost:3333"

Write-Host "✅ Shadow Command Center Online" -ForegroundColor Green

# Shadow Core AI Engine — Windows Bootstrap
# Starts Ollama server with GPU acceleration and loads custom Shadow model

Write-Host "=== SHADOW CORE AI ENGINE STARTUP ===" -ForegroundColor Magenta

# Start Ollama server in background
Start-Process "ollama" -ArgumentList "serve" -WindowStyle Hidden
Write-Host "Ollama server starting..." -ForegroundColor Cyan

# Wait for server to initialize
Start-Sleep -Seconds 2

# Load Shadow Core model
Write-Host "Loading shadow-core-1 model..." -ForegroundColor Green
ollama run shadow-core-1

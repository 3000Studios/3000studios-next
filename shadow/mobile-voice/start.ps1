Write-Host "🎤 Shadow Voice OS — Quick Start" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm not found. Please install Node.js." -ForegroundColor Red
    exit 1
}

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Dependency installation failed." -ForegroundColor Red
        exit 1
    }
}

Write-Host "🚀 Starting Voice OS..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 Scan the QR code with Expo Go app" -ForegroundColor Yellow
Write-Host "🎤 Say 'Hey Dude' to activate voice commands" -ForegroundColor Yellow
Write-Host ""

npm start

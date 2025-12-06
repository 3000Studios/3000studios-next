Write-Host "🔥 Shadow Voice OS — Local APK Build" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
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

# Install EAS CLI if not present
if (-not (Get-Command eas -ErrorAction SilentlyContinue)) {
    Write-Host "📥 Installing EAS CLI globally..." -ForegroundColor Yellow
    npm install -g eas-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ EAS CLI installation failed." -ForegroundColor Red
        exit 1
    }
}

Write-Host "🏗️  Building APK locally..." -ForegroundColor Green
Write-Host ""

eas build -p android --local

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ APK built successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Install on your Android device:" -ForegroundColor Cyan
    Write-Host "   1. Transfer the APK to your phone" -ForegroundColor White
    Write-Host "   2. Enable 'Install from Unknown Sources'" -ForegroundColor White
    Write-Host "   3. Open the APK and install" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
    Write-Host ""
}

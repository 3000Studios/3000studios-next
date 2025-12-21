# Auto-Heal Script for Windows (PowerShell)
Write-Host "Starting Auto-Heal Process..." -ForegroundColor Cyan

# Clean dependencies
if (Test-Path "node_modules") {
    Write-Host "Cleaning node_modules..." -ForegroundColor Yellow
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
}

# Reinstall
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Fix Lint Errors
Write-Host "Auto-fixing lint errors..." -ForegroundColor Cyan
npm run lint -- --fix

# Build
Write-Host "Attempting build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Auto-Heal Complete - System Healthy" -ForegroundColor Green
}
else {
    Write-Host "FAILED: Auto-Heal Failed - Build Error" -ForegroundColor Red
    exit 1
}

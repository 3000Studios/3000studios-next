# Shadow Mobile — Quick Start Script
# Starts Expo development server

Write-Host "🟦 SHADOW MOBILE — STARTING DEV SERVER" -ForegroundColor Cyan

# Navigate to mobile directory
Set-Location "C:\Users\MrJws\3000studios-next\shadow\mobile"

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies first..." -ForegroundColor Yellow
    npm install
}

# Get local IP address
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254.*" } | Select-Object -First 1).IPAddress
Write-Host "📡 Your PC's local IP: $localIP" -ForegroundColor Green
Write-Host "⚠️ Make sure to update YOUR_PC_LOCAL_IP in App.js to: ws://${localIP}:3333" -ForegroundColor Yellow

# Start Expo
Write-Host "🚀 Starting Expo..." -ForegroundColor Cyan
npx expo start

# Instructions appear after Expo starts
Write-Host ""
Write-Host "📱 Scan the QR code with Expo Go app on your phone" -ForegroundColor Magenta
Write-Host "🌐 Or press 'a' to open on Android emulator" -ForegroundColor Magenta

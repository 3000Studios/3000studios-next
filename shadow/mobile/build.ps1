# Shadow Mobile APK Builder
# Builds production-ready APK for Android

Write-Host "🟦 SHADOW MOBILE — APK BUILD SCRIPT" -ForegroundColor Cyan

# Step 1: Navigate to mobile directory
Set-Location "C:\Users\MrJws\3000studios-next\shadow\mobile"
Write-Host "✅ Navigated to mobile directory" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install --force

# Step 3: Install EAS CLI globally (if not already installed)
Write-Host "🔧 Installing EAS CLI..." -ForegroundColor Yellow
npm install -g eas-cli

# Step 4: Login to Expo (requires EAS token)
# Get your token from: https://expo.dev/accounts/[username]/settings/access-tokens
Write-Host "🔐 Logging in to Expo..." -ForegroundColor Yellow
Write-Host "You'll need an EAS token from: https://expo.dev/settings/access-tokens" -ForegroundColor Magenta

# Uncomment the line below and replace YOUR_EAS_TOKEN with your actual token
# eas login --token YOUR_EAS_TOKEN

# Or login interactively:
eas login

# Step 5: Configure project (first time only)
Write-Host "⚙️ Configuring EAS project..." -ForegroundColor Yellow
eas build:configure

# Step 6: Build APK locally (no cloud, faster)
Write-Host "🚀 Building APK locally..." -ForegroundColor Cyan
eas build -p android --profile preview --local

# Alternative: Build in Expo cloud (slower, but no local setup needed)
# eas build -p android --profile preview

Write-Host "✅ Build complete! APK saved in current directory." -ForegroundColor Green
Write-Host "📱 Transfer APK to your phone and install it." -ForegroundColor Cyan
Write-Host "⚠️ Remember to update YOUR_PC_LOCAL_IP in App.js before building!" -ForegroundColor Yellow

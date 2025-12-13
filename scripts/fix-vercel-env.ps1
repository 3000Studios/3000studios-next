# 🔒 Vercel Environment Variable Fix Script (PowerShell)
# Fixes NEXT_PUBLIC_SITE_URL circular reference issue
# Usage: .\scripts\fix-vercel-env.ps1

$ErrorActionPreference = "Stop"

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   VERCEL ENVIRONMENT VARIABLE FIX                      ║" -ForegroundColor Cyan
Write-Host "║   Fixing NEXT_PUBLIC_SITE_URL circular reference       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
$projectPath = "C:\DEV\3000studios-next"
if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✅ Changed to project directory: $projectPath" -ForegroundColor Green
} else {
    Write-Host "⚠️  Using current directory: $(Get-Location)" -ForegroundColor Yellow
}
Write-Host ""

# Check if vercel CLI is installed
try {
    $vercelVersion = vercel --version 2>$null
    Write-Host "✅ Vercel CLI found (version: $vercelVersion)" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found" -ForegroundColor Red
    Write-Host "💡 Install with: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Step 1: Check authentication
Write-Host "🔐 Step 1: Checking authentication..." -ForegroundColor Yellow
try {
    $vercelUser = vercel whoami 2>&1
    Write-Host "✅ Authenticated as: $vercelUser" -ForegroundColor Green
} catch {
    Write-Host "❌ Not authenticated with Vercel" -ForegroundColor Red
    Write-Host "💡 Run: vercel login" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Step 2: List current environment variables
Write-Host "📋 Step 2: Checking current environment variables..." -ForegroundColor Yellow
Write-Host "Current variables:" -ForegroundColor Cyan
try {
    vercel env ls
} catch {
    Write-Host "⚠️  Could not list variables" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Remove broken reference
Write-Host "🗑️  Step 3: Removing NEXT_PUBLIC_SITE_URL (if exists)..." -ForegroundColor Yellow
try {
    vercel env rm NEXT_PUBLIC_SITE_URL production --yes 2>&1 | Out-Null
    Write-Host "✅ Removed old reference" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Variable may not exist (that's okay)" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Add correct value
Write-Host "➕ Step 4: Adding NEXT_PUBLIC_SITE_URL with literal value..." -ForegroundColor Yellow
Write-Host "ℹ️  When prompted:" -ForegroundColor Cyan
Write-Host "   - Enter: https://3000studios.com" -ForegroundColor Cyan
Write-Host "   - Mark as sensitive? NO (Press N)" -ForegroundColor Cyan
Write-Host ""

vercel env add NEXT_PUBLIC_SITE_URL production --force

Write-Host "✅ Added NEXT_PUBLIC_SITE_URL" -ForegroundColor Green
Write-Host ""

# Step 5: Verify
Write-Host "🔍 Step 5: Verifying environment variables..." -ForegroundColor Yellow
vercel env ls
Write-Host ""

# Step 6: Deploy
Write-Host "🚀 Step 6: Ready to deploy?" -ForegroundColor Yellow
$deploy = Read-Host "Deploy to production now? (y/N)"
if ($deploy -eq "y" -or $deploy -eq "Y") {
    Write-Host "🚀 Deploying to production..." -ForegroundColor Yellow
    vercel --prod --yes
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
} else {
    Write-Host "⏸️  Skipped deployment" -ForegroundColor Yellow
    Write-Host "💡 Deploy manually with: vercel --prod --yes" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   FIX COMPLETE                                         ║" -ForegroundColor Cyan
Write-Host "╠════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║   ✅ NEXT_PUBLIC_SITE_URL fixed                        ║" -ForegroundColor Cyan
Write-Host "║   ✅ Using literal value (not secret reference)        ║" -ForegroundColor Cyan
Write-Host "║   ✅ Ready for deployment                              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

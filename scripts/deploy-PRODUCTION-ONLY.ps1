# ============================================================
# 3000 STUDIOS — SINGLE AUTHORITATIVE DEPLOY SCRIPT
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host "🔍 Locating repository root..."

# ------------------------------------------------------------
# AUTO-DETECT REPO ROOT
# ------------------------------------------------------------
$startDir = Get-Location
$current = $startDir

while ($true) {
    if (Test-Path (Join-Path $current ".git")) {
        Set-Location $current
        Write-Host "📁 Repo root found: $current"
        break
    }
    $parent = Split-Path $current -Parent
    if ($parent -eq $current) {
        Write-Error "❌ Could not locate git repository root"
        exit 1
    }
    $current = $parent
}

# ------------------------------------------------------------
# ASSERT MAIN BRANCH
# ------------------------------------------------------------
$branch = git branch --show-current
if ($branch -ne "main") {
    Write-Error "❌ REFUSING TO DEPLOY — branch is '$branch'"
    exit 1
}
Write-Host "🌿 Branch OK: main"

# ------------------------------------------------------------
# HANDLE DIRTY WORKING TREE (SAFE AUTO-COMMIT)
# ------------------------------------------------------------
$dirty = git status --porcelain
if ($dirty) {
    Write-Host "⚠️ Dirty working tree detected"

    $blocked = $dirty | Where-Object {
        $_ -match "node_modules|\.next|npm-debug|\.log$"
    }

    if ($blocked) {
        Write-Error "❌ Refusing to commit build artifacts or logs"
        git status
        exit 1
    }

    git add -A
    git commit -m "chore: pre-deploy cleanup $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" | Out-Null
}

Write-Host "✅ Working tree clean"

# ------------------------------------------------------------
# VALIDATE ENVIRONMENT VARIABLES
# ------------------------------------------------------------
$REQUIRED_ENVS = @("NODE_ENV","NEXT_PUBLIC_SITE_URL")
foreach ($name in $REQUIRED_ENVS) {
    if (-not [Environment]::GetEnvironmentVariable($name)) {
        Write-Error "❌ Missing environment variable: $name"
        exit 1
    }
}
Write-Host "🔐 Environment variables validated"

# ------------------------------------------------------------
# INSTALL DEPENDENCIES
# ------------------------------------------------------------
if (-not (Test-Path "node_modules")) {
    npm install
}

# ------------------------------------------------------------
# BUILD (FAIL FAST)
# ------------------------------------------------------------
Write-Host "🏗️ Running production build..."
npm run build

# ------------------------------------------------------------
# FINAL COMMIT & PUSH
# ------------------------------------------------------------
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git add -A
git commit -m "deploy: production release ($stamp)" | Out-Null
git push origin main

Write-Host "🚀 DEPLOY COMPLETE"
Write-Host "Live: https://3000studios.com"

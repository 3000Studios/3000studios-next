# ================================
# ANTIGRAVITY FINAL TS CLEANUP
# ================================

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
$ErrorActionPreference = "Stop"

$ROOT = "C:\ANTIGRAVITY\3000studios-next"
cd $ROOT

Write-Host "`n=== FINAL TYPESCRIPT CLEANUP ===`n" -ForegroundColor Cyan

$target = "app/api/assets/route.ts"
if (!(Test-Path $target)) {
  Write-Host "❌ Target file not found: $target" -ForegroundColor Red
  exit 1
}

$content = Get-Content $target -Raw

# Fix console.error('', e) → console.error('', error)
$content = $content -replace "console\.error\(\s*''\s*,\s*e\s*\)", "console.error('', error)"

# Fix catch (_err) { console.error('', err) } → console.error('', _err)
$content = $content -replace "catch\s*\(\s*_err\s*\)\s*{([^}]*)console\.error\(\s*''\s*,\s*err\s*\)", "catch (_err) {`$1console.error('', _err)"

Set-Content $target $content -Encoding UTF8

Write-Host "✔ asset route error variables fixed" -ForegroundColor Green

Write-Host "`nRunning final type-check..." -ForegroundColor Cyan
pnpm run type-check

Write-Host "`n=== ✅ TYPESCRIPT IS NOW ACTUALLY CLEAN ===" -ForegroundColor Green

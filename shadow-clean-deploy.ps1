Write-Host "=== 3000 STUDIOS SHADOW CLEAN & DEPLOY ==="

# Kill node_modules trash
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
}

# Clean build cache
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
}

# Fresh install
npm install

# Build it
npm run build

# Deploy it
vercel deploy --prod --yes

Write-Host "=== DEPLOY COMPLETE ==="

$path = Get-Location
Write-Host "🚀 Antigravity AutoSync ACTIVE in: $path"
while ($true) {
    try {
        $status = git status --porcelain
        if ($status) {
            $count = ($status | Measure-Object -Line).Lines
            Write-Host "📦 Changes detected ($count files). Syncing..."
            git add -A
            git commit -m "auto(sync): $count file(s) updated @ $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

            Write-Host "🔄 Pulling latest changes..."
            git pull origin main --rebase -X theirs

            Write-Host "📤 Pushing to Global Nexus..."
            git push origin main
            Write-Host "✅ Auto-committed + pushed."
        }
    } catch {
        Write-Host "❌ Error: $_"
    }
    Start-Sleep -Seconds 5
}


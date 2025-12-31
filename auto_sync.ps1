$path = "C:\Users\MrJws\.gemini\antigravity\scratch\3000studios-next"
Set-Location $path
Write-Host "Monitoring $path for changes..."
while ($true) {
    try {
        $status = git status --porcelain
        if ($status) {
            Write-Host "Changes detected. Syncing..."
            git add .
            git commit -m "Auto-save: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            git pull origin main -X theirs
            git push origin main
            Write-Host "Sync complete."
        }
    } catch {
        Write-Host "Error: $_"
    }
    Start-Sleep -Seconds 5
}

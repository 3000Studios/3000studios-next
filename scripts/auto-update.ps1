# Auto-Update Script
Write-Host "🚀 Starting Auto-Update Sequence"

# Add all changes
git add .

# Check if there are changes to commit
if (git status --porcelain) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $message = "🤖 Auto-Update: $timestamp"
    
    # Commit changes
    git commit -m "$message"
    
    # Push to current branch
    git push
    
    Write-Host "✅ Changes committed and pushed!"
} else {
    Write-Host "✨ No changes to commit."
}

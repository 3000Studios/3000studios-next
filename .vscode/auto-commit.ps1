param (
    [string]$Message = "auto: sync and save"
)

$ErrorActionPreference = "Stop"

git status --porcelain
git add .
git commit -m $Message
git push origin main

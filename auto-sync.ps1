while (\True) {
  git add .
  git diff --cached --quiet || (
    git commit -m 'auto: local live update'
    git pull --rebase
    git push
  )
  Start-Sleep -Seconds 5
}

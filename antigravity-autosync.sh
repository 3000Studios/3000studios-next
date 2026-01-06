#!/usr/bin/env bash

# Antigravity AutoSync - Persistent Workspace Protection
# Ensures every file change is committed and pushed immediately.

REPO_DIR="$(pwd)"
BRANCH="$(git branch --show-current)"

echo "🚀 Antigravity AutoSync ACTIVE on branch: $BRANCH"

while true; do
  # Check if there are any changes (including untracked files)
  STATUS=$(git status --porcelain)
  if [[ -n "$STATUS" ]]; then
    FILE_COUNT=$(echo "$STATUS" | wc -l | tr -d ' ')

    # Use PowerShell to get timestamp on Windows, fallback to date on Unix
    if command -v powershell >/dev/null 2>&1; then
      TIMESTAMP=$(powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'")
    else
      TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    fi

    # Auto-generate intelligent commit message
    MSG="auto(sync): ${FILE_COUNT} file(s) updated @ ${TIMESTAMP}"

    echo "📦 Changes detected ($FILE_COUNT files). Committing..."
    git add -A
    git commit -m "$MSG" || echo "⚠️ Nothing to commit"

    echo "🔄 Pulling latest from Global Nexus..."
    git pull origin "$BRANCH" --rebase -X theirs || echo "⚠️ Pull failed, attempting push anyway..."

    echo "📤 Pushing to Global Nexus..."
    if git push origin "$BRANCH"; then
      echo "✅ Auto-committed + pushed → $MSG"
    else
      echo "❌ Push failed. Retrying in next cycle."
    fi
  fi

  # Wait 5 seconds before next polling cycle
  sleep 5
done


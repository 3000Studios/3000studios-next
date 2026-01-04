#!/usr/bin/env bash
set -e

# Antigravity AutoSync - Persistent Workspace Protection
# Ensures every file change is committed and pushed immediately.

REPO_DIR="$(pwd)"
BRANCH="$(git branch --show-current)"

echo "🚀 Antigravity AutoSync ACTIVE on branch: $BRANCH"

while true; do
  # Check if there are any changes (including untracked files)
  if [[ -n "$(git status --porcelain)" ]]; then
    FILE_COUNT=$(git status --porcelain | wc -l | tr -d ' ')
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

    # Auto-generate intelligent commit message
    MSG="auto(sync): ${FILE_COUNT} file(s) updated @ ${TIMESTAMP}"

    echo "📦 Changes detected. Committing..."
    git add -A
    git commit -m "$MSG"

    echo "📤 Pushing to Global Nexus..."
    git push origin "$BRANCH"

    echo "✅ Auto-committed + pushed → $MSG"
  fi

  # Wait 5 seconds before next polling cycle
  sleep 5
done

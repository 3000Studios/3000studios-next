#!/usr/bin/env bash
set -e
cd "$(git rev-parse --show-toplevel)" || exit 1

# Configure git for auto-operations
git config --global pull.rebase false

# Ignore junk changes permanently
git update-index --assume-unchanged node_modules 2>/dev/null || true
git update-index --assume-unchanged .next 2>/dev/null || true
git update-index --assume-unchanged .vercel 2>/dev/null || true

while true; do
  sleep 45

  git add -A
  if git diff --cached --quiet; then 
    continue
  fi
  
  git commit -m "chore: auto-save progress" || true
  git push origin main || true
done

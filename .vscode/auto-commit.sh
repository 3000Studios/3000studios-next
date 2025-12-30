#!/usr/bin/env bash
cd "$(git rev-parse --show-toplevel)" || exit 1

# Ignore junk changes
git update-index --assume-unchanged node_modules 2>/dev/null || true
git update-index --assume-unchanged .next 2>/dev/null || true
git update-index --assume-unchanged .vercel 2>/dev/null || true

# --- SAFETY: block files >10MB ---
MAX=10485760
size_guard() {
  for f in $(git diff --cached --name-only); do
    if [ -f "$f" ]; then
      sz=$(stat -c%s "$f" 2>/dev/null || echo 0)
      if [ "$sz" -gt "$MAX" ]; then
        echo "❌ Blocked commit: $f exceeds 10MB"
        git reset "$f" || true
      fi
    fi
  done
}

while true; do
  sleep 45

  if [[ -n $(git status --porcelain) ]]; then
    git add -A
    size_guard
    git commit -m "chore: auto-save progress" || true
    git push origin main || true
  fi
done

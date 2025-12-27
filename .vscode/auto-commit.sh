#!/usr/bin/env bash
cd "$(git rev-parse --show-toplevel)" || exit 1

while true; do
  sleep 45

  if [[ -n $(git status --porcelain) ]]; then
    git add .
    git commit -m "chore: auto-save progress" || true
    git push origin main || true
  fi
done

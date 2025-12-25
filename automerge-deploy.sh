#!/bin/bash
# automerge-deploy.sh
# Usage: ./automerge-deploy.sh

set -e

echo "> Locating repo root..."
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

echo "> Checking git status..."
git status --porcelain=v1

echo "> Updating main..."
git fetch --all --prune
git checkout main
git pull

# --- Optional: merge PRs if GH CLI is present ---
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        echo "> Fetching open PRs..."
        PRS=$(gh pr list --state open --json number --jq '.[].number')
        for PR in $PRS; do
            echo "--- Merging PR #$PR ---"
            gh pr merge "$PR" --merge --delete-branch
            git pull
        done
    else
        echo "WARN: GH CLI present but not authenticated. Skipping PR merges."
    fi
else
    echo "WARN: GH CLI not found. Skipping PR merges."
fi

# --- Install + quality gates ---
if [ -f "pnpm-lock.yaml" ] && command -v pnpm &> /dev/null; then
    echo "> Using pnpm..."
    pnpm install
    pnpm run lint
    pnpm run build
elif [ -f "package-lock.json" ]; then
    echo "> Using npm..."
    npm ci
    npm run lint
    npm run build
elif [ -f "yarn.lock" ]; then
    echo "> Using yarn..."
    yarn install --frozen-lockfile
    yarn lint
    yarn build
else
    echo "Error: No recognized lockfile found."
    exit 1
fi

# --- Commit any fixes made by tools ---
if [ -n "$(git status --porcelain=v1)" ]; then
    echo "> Committing automated fixes..."
    git add -A
    git commit -m "chore: automated fixes + build green"
    git push origin main
fi

# --- Vercel deploy ---
if [ -z "$VERCEL_TOKEN" ]; then
    echo "WARN: VERCEL_TOKEN not set. Skipping deployment."
    exit 0
fi

echo "> Deploying to Vercel..."
vercel --version
vercel pull --yes --environment=production
vercel deploy --prod

echo "DONE: main updated + deployed."

#!/bin/bash
# Branch Cleanup Script
# Run this after the PR is merged to main to delete all merged branches

set -e

echo "🧹 Starting branch cleanup process..."
echo ""

# Ensure we're on main
echo "1️⃣ Switching to main branch..."
git checkout main

# Pull latest changes
echo "2️⃣ Pulling latest changes from origin/main..."
git pull origin main

# Delete local branches (ignore errors if branches don't exist locally)
echo "3️⃣ Deleting local branches..."
branches_to_delete=(
  "3000Studios-patch-1"
  "copilot/add-branch-protection-rules"
  "copilot/add-collaborator-feature"
  "copilot/add-hybrid-performance-rig"
  "copilot/add-permanent-revenue-lock-rule"
  "copilot/add-readme-and-license"
  "copilot/add-revenue-lock-ci-check"
  "copilot/add-shadow-prime-self-check"
  "copilot/auto-merge-pull-requests"
  "copilot/automationadd-ci-sync-deploy"
  "copilot/bring-repo-to-production-grade"
  "copilot/check-and-deploy-to-production"
  "copilot/deploy-all-features"
  "copilot/deploy-yml-changes"
  "copilot/explain-advanced-git-commands"
  "copilot/finalize-open-pull-requests"
  "copilot/fix-and-improve-system"
  "copilot/fix-node-version-warning"
  "copilot/fix-pull-request-issue"
  "copilot/fix-repo-architecture-errors"
  "copilot/list-latest-open-pull-requests"
  "copilot/prepare-production-readiness"
  "copilot/resolve-all-commits-and-branches"
  "copilot/retrieve-login-credentials-request"
  "copilot/sub-pr-10"
  "copilot/sync-local-workspace-with-github"
  "copilot/update-best-options"
  "copilot/update-main-with-all-branches"
  "copilot/update-password-and-login-link"
  "copilot/update-vcopilot-instructions"
  "dependabot/npm_and_yarn/npm_and_yarn-a9e5fb3b87"
  "merge-test"
  "vercel/install-vercel-web-analytics-f-k49rhc"
)

for branch in "${branches_to_delete[@]}"; do
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    echo "  Deleting local branch: $branch"
    git branch -D "$branch" || echo "    (Already deleted or doesn't exist)"
  fi
done

# Delete remote branches
echo ""
echo "4️⃣ Deleting remote branches..."
for branch in "${branches_to_delete[@]}"; do
  if git ls-remote --exit-code --heads origin "$branch" > /dev/null 2>&1; then
    echo "  Deleting remote branch: $branch"
    git push origin --delete "$branch" || echo "    (Already deleted or doesn't exist)"
  fi
done

# Prune remote tracking branches
echo ""
echo "5️⃣ Pruning remote tracking branches..."
git remote prune origin

# Show remaining branches
echo ""
echo "6️⃣ Verification - Remaining branches:"
git branch -a

echo ""
echo "✅ Branch cleanup complete!"
echo "📊 Final branch count: $(git branch -a | wc -l)"

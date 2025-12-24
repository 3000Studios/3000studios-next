#!/bin/bash
# Script to delete the copilot/configure-branch-protection branch after PR #64 is merged
# Run this script after this PR has been successfully merged into main

set -e

echo "🗑️  Deleting copilot/configure-branch-protection branch..."
echo ""

# Delete local branch if it exists
if git show-ref --verify --quiet "refs/heads/copilot/configure-branch-protection"; then
    echo "1️⃣ Deleting local branch..."
    git branch -D copilot/configure-branch-protection
    echo "   ✅ Local branch deleted"
else
    echo "1️⃣ Local branch already deleted"
fi

# Delete remote branch
echo ""
echo "2️⃣ Deleting remote branch..."
if git ls-remote --exit-code --heads origin copilot/configure-branch-protection > /dev/null 2>&1; then
    git push origin --delete copilot/configure-branch-protection
    echo "   ✅ Remote branch deleted"
else
    echo "   ℹ️  Remote branch already deleted"
fi

# Prune remote tracking branches
echo ""
echo "3️⃣ Pruning remote tracking branches..."
git remote prune origin
echo "   ✅ Pruning complete"

# Verification
echo ""
echo "4️⃣ Verification..."
if git ls-remote --exit-code --heads origin copilot/configure-branch-protection > /dev/null 2>&1; then
    echo "   ⚠️  WARNING: Branch still exists!"
    exit 1
else
    echo "   ✅ Branch successfully deleted"
fi

echo ""
echo "✅ Branch deletion complete!"
echo "   The copilot/configure-branch-protection branch has been removed."

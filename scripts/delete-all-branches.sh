#!/bin/bash
# Script to delete all remote branches except main after consolidation
# Run this after the consolidated changes have been merged to main

set -e

cd "$(dirname "$0")/.."

echo "=========================================="
echo "Branch Deletion Script"
echo "=========================================="
echo ""
echo "This script will delete all remote branches except 'main'"
echo "after they have been consolidated into main."
echo ""

# Confirmation prompt
read -p "Are you sure you want to delete all branches? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "Fetching all branches..."
git fetch --all

echo ""
echo "Getting list of branches to delete..."
BRANCHES=$(git ls-remote --heads origin | awk '{print $2}' | sed 's|refs/heads/||' | grep -v '^main$' | sort)

if [ -z "$BRANCHES" ]; then
    echo "No branches to delete."
    exit 0
fi

echo ""
echo "The following branches will be deleted:"
echo "$BRANCHES"
echo ""

# Delete each branch
echo "Deleting branches..."
for branch in $BRANCHES; do
    echo "  Deleting: $branch"
    if git push origin --delete "$branch" 2>&1; then
        echo "    ✓ Deleted successfully"
    else
        echo "    ✗ Failed to delete (may already be deleted or protected)"
    fi
done

echo ""
echo "=========================================="
echo "Branch deletion complete!"
echo "=========================================="
echo ""
echo "Remaining branches:"
git ls-remote --heads origin | awk '{print $2}' | sed 's|refs/heads/||'

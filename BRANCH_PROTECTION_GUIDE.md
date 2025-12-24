# Branch Protection Configuration Guide

## Overview

This document provides instructions for configuring branch protection rules for the `main` branch to prevent accidental changes and ensure code quality.

## Why Branch Protection?

Branch protection rules help you:
- Prevent direct pushes to protected branches
- Require pull request reviews before merging
- Require status checks to pass before merging
- Ensure branches are up to date before merging
- Restrict who can push to or merge branches

## Recommended Protection Rules for Main Branch

### Step 1: Access Branch Protection Settings

1. Go to the repository: https://github.com/3000Studios/3000studios-next
2. Click on **Settings** (requires admin access)
3. Click on **Branches** in the left sidebar
4. Click **Add branch protection rule**

### Step 2: Configure Protection Rule

#### Basic Settings
- **Branch name pattern**: `main`

#### Protect matching branches

✅ **Require a pull request before merging**
- Require approvals: **1** (or more based on team size)
- Dismiss stale pull request approvals when new commits are pushed
- Require review from Code Owners (if CODEOWNERS file exists)

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Status checks to require (if applicable):
  - Build checks
  - Test suites
  - Linting
  - Security scans

✅ **Require conversation resolution before merging**
- All review comments must be resolved

✅ **Require signed commits** (optional but recommended)
- Ensures all commits are cryptographically signed

✅ **Require linear history** (optional)
- Prevents merge commits, requires rebase or squash merging

✅ **Include administrators**
- Enforce all configured restrictions for administrators

#### Additional Settings

✅ **Allow force pushes**: **Disabled**
- Prevents force pushes that could rewrite history

✅ **Allow deletions**: **Disabled**
- Prevents the branch from being deleted

### Step 3: Save Protection Rule

Click **Create** or **Save changes** to apply the protection rule.

## Current Repository Status

After branch consolidation:
- All feature branches have been merged into `main`
- Branch deletion script is available at `scripts/delete-all-branches.sh`
- Repository is ready for protection rules

## Next Steps

1. **Merge the consolidation PR**
   - Review the branch consolidation changes
   - Merge the PR to update `main` with all consolidated changes

2. **Delete old branches**
   ```bash
   # After merging the consolidation PR
   ./scripts/delete-all-branches.sh
   ```

3. **Configure branch protection**
   - Follow the steps above to set up protection rules
   - Test the protection by attempting to push directly to `main`

4. **Set up required status checks** (optional)
   - Configure CI/CD workflows
   - Add status checks to protection rule

## Verification

After setting up branch protection, verify it works:

1. Try to push directly to `main`:
   ```bash
   git checkout main
   git commit --allow-empty -m "Test protection"
   git push origin main
   ```
   This should fail with a protection error.

2. Create a PR to `main`:
   ```bash
   git checkout -b test-branch
   git commit --allow-empty -m "Test PR"
   git push origin test-branch
   # Create PR via GitHub UI
   ```
   You should be able to create a PR but not merge it without meeting protection requirements.

## GitHub CLI Commands (Alternative)

If you prefer using the GitHub CLI:

```bash
# View current branch protection
gh api repos/3000Studios/3000studios-next/branches/main/protection

# Update branch protection (requires admin access)
gh api -X PUT repos/3000Studios/3000studios-next/branches/main/protection \
  -f required_status_checks='{"strict":true,"contexts":[]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"required_approving_review_count":1}' \
  -f restrictions=null
```

## Best Practices

1. **Always use pull requests** for changes to `main`
2. **Review code** before merging
3. **Run tests** locally before pushing
4. **Keep branches short-lived** - merge frequently
5. **Delete merged branches** to keep repository clean
6. **Use semantic commit messages** for better history

## Additional Resources

- [GitHub Branch Protection Rules Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Managing Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
- [Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging)

## Support

For questions or issues with branch protection:
1. Check GitHub's documentation
2. Review repository settings
3. Contact repository administrators

---

**Date**: 2025-12-24  
**Status**: Configuration Guide Complete - Awaiting Implementation

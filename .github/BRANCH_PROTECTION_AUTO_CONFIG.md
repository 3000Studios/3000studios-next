# Branch Protection Auto-Configuration

## 🎯 Overview

This repository includes automated branch protection configuration to ensure code quality, prevent breaking changes, and protect revenue-critical code paths.

## 🚀 Quick Start

### Prerequisites

- Repository admin access
- GitHub Personal Access Token with `repo` scope

### Configure Protection Rules

**Option 1: Using npm script (Local)**
```bash
export GITHUB_TOKEN=your_admin_token
npm run configure-branch-protection
```

**Option 2: Using GitHub Actions (Recommended)**
1. Navigate to **Actions** tab in GitHub
2. Select **Configure Branch Protection** workflow
3. Click **Run workflow**
4. Click **Run workflow** button to confirm

## 📁 Configuration File

All branch protection rules are defined in `.github/branch-protection-config.yml`:

```yaml
branch: main

required_pull_request_reviews:
  required_approving_review_count: 1
  dismiss_stale_reviews: true
  require_code_owner_reviews: false

required_status_checks:
  strict: true  # Require up-to-date branches
  contexts:
    - build
    - lint
    - type-check

enforce_admins: true
allow_force_pushes: false
allow_deletions: false
required_linear_history: true
```

### Modifying Configuration

1. Edit `.github/branch-protection-config.yml`
2. Commit changes
3. Push to main branch (or create PR if protection already enabled)
4. GitHub Action automatically applies the new configuration

## 🛡️ Protection Rules Applied

Once configured, the main branch has these protections:

| Protection | Status | Description |
|------------|--------|-------------|
| **Pull Request Required** | ✅ | All changes must go through PR workflow |
| **Code Review** | ✅ | Minimum 1 approval required before merge |
| **Dismiss Stale Reviews** | ✅ | New commits invalidate previous approvals |
| **Status Checks** | ✅ | Build, lint, type-check must pass |
| **Up-to-date Branch** | ✅ | Branch must be current with main |
| **Enforce for Admins** | ✅ | Rules apply to everyone, including admins |
| **Linear History** | ✅ | Clean git history, no merge commits |
| **Block Force Push** | ✅ | Cannot rewrite history |
| **Block Deletions** | ✅ | Cannot delete protected branch |
| **Conversation Resolution** | ✅ | All review comments must be resolved |

## 🔍 Verification

### Check Protection Status

```bash
# Verify all rules are applied correctly
npm run verify-branch-protection
```

Expected output:
```
✅ Pull request before merging: ENABLED
✅ Minimum 1 approval: ENABLED
✅ Dismiss stale approvals: ENABLED
✅ Status checks requirement: ENABLED
✅ Up-to-date branch requirement: ENABLED
✅ Push restrictions: ENABLED
```

### Test Protection (Should Fail)

```bash
# Try direct push to main (should be blocked)
git checkout main
git commit --allow-empty -m "test protection"
git push origin main

# Expected error:
# remote: error: GH006: Protected branch update failed
```

## 📊 Monitoring

### Automated Daily Checks

The repository includes a monitoring workflow that runs daily to verify protection remains active:

- **Workflow**: `.github/workflows/branch-protection-check.yml`
- **Schedule**: Daily at 9 AM UTC
- **Action**: Creates issue if protection is disabled or incomplete

### Manual Verification

```bash
# Run verification script locally
npm run verify-branch-protection
```

## 🔄 Developer Workflow

With protection enabled, the standard workflow is:

```bash
# 1. Create feature branch
git checkout -b feature/my-awesome-feature

# 2. Make changes
# ... edit files ...
git add .
git commit -m "feat: add awesome feature"

# 3. Push branch
git push origin feature/my-awesome-feature

# 4. Open Pull Request
# - Go to GitHub
# - Click "New Pull Request"
# - Add description
# - Request review

# 5. Wait for:
# - CI checks to pass (build, lint, type-check)
# - At least 1 approval
# - Branch to be up-to-date

# 6. Merge via GitHub UI
# - Squash and merge (recommended)
# - Delete branch after merge
```

## 🆘 Troubleshooting

### "Cannot push to protected branch"

**This is expected behavior.** Create a pull request instead:

```bash
git checkout -b feature/fix
# make changes
git push origin feature/fix
# Open PR on GitHub
```

### "Status checks haven't completed"

Wait for CI workflow to finish. Check the **Actions** tab for progress.

### "Branch is out of date"

Update your branch with main:

```bash
git checkout your-branch
git fetch origin
git rebase origin/main
git push --force-with-lease origin your-branch
```

### "Insufficient permissions" when running script

Ensure your GitHub token has:
- `repo` scope with full control
- Admin access to the repository

Generate a new token: https://github.com/settings/tokens

### Configuration not applying

1. Check GitHub Actions logs for errors
2. Verify token has admin permissions
3. Manually review `.github/branch-protection-config.yml` for syntax errors

## 🔐 Security

### Token Security

- **NEVER** commit GitHub tokens to the repository
- Use environment variables: `export GITHUB_TOKEN=...`
- Use GitHub Secrets for workflows
- Rotate tokens regularly
- Use fine-grained tokens when possible

### Permission Requirements

The configuration script requires:
- **Scope**: `repo` (full control of private repositories)
- **Access**: Admin access to the repository
- **Why**: Branch protection is a repository administration feature

## 📚 Related Documentation

- **[BRANCH_PROTECTION_SETUP.md](./BRANCH_PROTECTION_SETUP.md)** - Detailed setup guide
- **[BRANCH_PROTECTION_RULES.md](./BRANCH_PROTECTION_RULES.md)** - Quick reference
- **[GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)** - Official documentation

## 📝 Files in This System

| File | Purpose |
|------|---------|
| `.github/branch-protection-config.yml` | Configuration as code |
| `scripts/configure-branch-protection.mjs` | Configuration script |
| `scripts/verify-branch-protection.mjs` | Verification script |
| `.github/workflows/configure-branch-protection.yml` | Auto-apply workflow |
| `.github/workflows/branch-protection-check.yml` | Daily monitoring workflow |

## 🎉 Benefits

### For the Team

- 🛡️ **Safety** - Prevents accidental breaking changes
- 📝 **Quality** - Enforces code review and testing
- 🔍 **Transparency** - All changes visible in PRs
- 📊 **Audit Trail** - Complete history of all changes

### For the Business

- 💰 **Revenue Protection** - Prevents breaking payment/ads
- ⚡ **Reliability** - Reduces production incidents
- 🚀 **Confidence** - Deploy with peace of mind
- 📈 **Compliance** - Meet security/audit requirements

## ✨ Next Steps

1. **Apply Configuration**
   ```bash
   npm run configure-branch-protection
   ```

2. **Verify It Works**
   ```bash
   npm run verify-branch-protection
   ```

3. **Test Protection**
   ```bash
   git push origin main  # Should fail
   ```

4. **Start Using PRs**
   - Create feature branches
   - Open pull requests
   - Get reviews
   - Merge safely

---

**Status**: ✅ Ready to use
**Last Updated**: 2025-12-27
**Maintained by**: Repository Administrators

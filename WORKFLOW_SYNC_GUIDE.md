# 🔄 3000 Studios - Complete Workflow Synchronization Guide

**Last Updated**: December 14, 2025  
**Purpose**: Seamlessly integrate VS Code workspace, GitHub repository, and Vercel deployments

---

## 📋 Overview

This guide ensures your **local VS Code workspace**, **GitHub repository**, and **Vercel deployments** stay perfectly synchronized in real-time without losing any work.

### 🎯 Goals
- ✅ Keep local changes synced with GitHub
- ✅ Automatic deployments to Vercel on every push
- ✅ No data loss between environments
- ✅ Real-time synchronization
- ✅ Maintain all connections seamlessly

---

## 🏗️ Current Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  YOUR LOCAL ENVIRONMENT                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ VS Code Workspace                                         │  │
│  │ - File: 3000studios-next.code-workspace                  │  │
│  │ - Settings: .vscode/settings.json                        │  │
│  │ - Extensions: Copilot, ESLint, Prettier, Tailwind       │  │
│  │ - Dev Server: http://localhost:3000 (pnpm dev)          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          ↕ (Git Sync)                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Local Git Repository                                      │  │
│  │ - Branch: main / feature branches                        │  │
│  │ - Remote: origin (GitHub)                                │  │
│  │ - Auth: GitHub CLI (gh) + Windows Credential Manager    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          ↕ (HTTPS Push/Pull)
┌─────────────────────────────────────────────────────────────────┐
│                         GITHUB                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Repository: 3000Studios/3000studios-next                  │  │
│  │ - Branch: main (protected)                                │  │
│  │ - Branches: feature/*, copilot/*                          │  │
│  │ - GitHub Actions: Auto-build & deploy workflows          │  │
│  │ - Secrets: Vercel tokens, API keys (encrypted)           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          ↕ (GitHub Actions)
┌─────────────────────────────────────────────────────────────────┐
│                          VERCEL                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Project: 3000studios-next                                 │  │
│  │ - Production: main branch → https://3000studios.com       │  │
│  │ - Preview: feature branches → auto-generated URLs         │  │
│  │ - Build: Automatic on every push                          │  │
│  │ - Environment: Variables synced from GitHub Secrets       │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Initial Setup (One-Time Configuration)

### 1. VS Code Workspace Setup

Your workspace is already configured with `3000studios-next.code-workspace`. This file:
- ✅ Configures editor settings (format on save, auto-fix)
- ✅ Enables Git auto-fetch
- ✅ Configures recommended extensions
- ✅ Sets up file exclusions for performance

**No action needed** - workspace is already optimized.

### 2. Git Configuration

Verify your Git is configured correctly:

```bash
# Check Git configuration
git config --global user.name
git config --global user.email

# If not set, configure:
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### 3. GitHub Authentication

Ensure GitHub CLI is authenticated:

```powershell
# Check authentication status
gh auth status

# If not authenticated, login:
gh auth login
# Choose: GitHub.com → HTTPS → Login with web browser
```

**Credential Storage**: Uses Windows Credential Manager (secure, encrypted)

### 4. Vercel Connection

Your repository is already connected to Vercel through GitHub Actions:

**File**: `.github/workflows/vercel-deploy.yml`

**Required GitHub Secrets** (Settings → Secrets and variables → Actions):
```
VERCEL_TOKEN          # From Vercel Dashboard → Settings → Tokens
VERCEL_ORG_ID         # From Vercel Project Settings
VERCEL_PROJECT_ID     # From Vercel Project Settings
```

**To get these values**:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → General
4. Copy `Project ID` and `Organization ID`
5. Go to Account Settings → Tokens
6. Create new token for "GitHub Actions"

---

## 🔄 Daily Workflow (Stay in Sync)

### Step 1: Start Your Day - Sync Down

```powershell
# Open VS Code workspace
code 3000studios-next.code-workspace

# Pull latest changes from GitHub
git checkout main
git pull origin main

# Start development server
pnpm dev
```

**Result**: Your local environment now matches GitHub exactly.

### Step 2: Make Changes Locally

Edit files in VS Code:
- Auto-save is enabled (1 second delay)
- Format on save is enabled
- ESLint auto-fix on save is enabled
- Dev server auto-refreshes on changes

**Preview**: http://localhost:3000

### Step 3: Test Your Changes

```powershell
# Build to verify no errors
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm typecheck
```

**All must pass** before committing.

### Step 4: Commit Changes Locally

```powershell
# Check what changed
git status

# Stage all changes
git add .

# Or stage specific files
git add src/app/page.tsx

# Commit with descriptive message
git commit -m "feat: add new feature to homepage"
```

**Commit Message Format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting changes
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Step 5: Push to GitHub (Trigger Deployment)

```powershell
# Push to current branch
git push origin main

# Or use the secure sync script (automated)
.\scripts\secure-sync.ps1
```

**About the secure-sync.ps1 script**:
- Verifies GitHub CLI authentication before proceeding
- Fetches latest changes from remote
- Stages all modified files
- Creates timestamped commit
- Pushes to remote repository
- Provides clear feedback on each step

**What Happens Automatically**:
1. ✅ Code pushed to GitHub repository
2. ✅ GitHub Actions workflow triggered
3. ✅ Code built and tested
4. ✅ Deployed to Vercel production (if main branch)
5. ✅ Deployment URL available in ~5-7 minutes

### Step 6: Monitor Deployment

**GitHub Actions**:
- Go to: https://github.com/3000Studios/3000studios-next/actions
- Watch build progress in real-time
- View logs if build fails

**Vercel Dashboard**:
- Go to: https://vercel.com/dashboard
- View deployment status
- Access deployment URL
- Check build logs

---

## 🌿 Branch-Based Workflow (Feature Development)

### For New Features

```powershell
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/my-new-feature

# Make changes and commit
git add .
git commit -m "feat: implement my new feature"

# Push feature branch
git push origin feature/my-new-feature
```

**Result**: 
- Creates preview deployment on Vercel
- URL: `https://3000studios-next-git-feature-my-new-feature.vercel.app`
- Doesn't affect production site

### Merge to Main (Deploy to Production)

```powershell
# Option 1: GitHub Pull Request (Recommended)
# 1. Go to GitHub repository
# 2. Click "Pull requests" → "New pull request"
# 3. Select base: main, compare: feature/my-new-feature
# 4. Click "Create pull request"
# 5. Review changes, then click "Merge pull request"

# Option 2: Command Line
git checkout main
git pull origin main
git merge feature/my-new-feature
git push origin main
```

**Result**: Merged changes automatically deploy to production.

---

## 🔐 Environment Variables Synchronization

### Local Development (.env.local)

**File**: `.env.local` (NOT committed to Git)

```env
# Local development only
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-password
NEXT_PUBLIC_MAPS_API=your-google-maps-key
```

**Create from template**:
```powershell
cp .env.example .env.local
# Edit .env.local with your actual values
```

### GitHub Secrets

**Location**: Repository Settings → Secrets and variables → Actions

**Add these secrets**:
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
ADMIN_EMAIL
ADMIN_PASSWORD
GOOGLE_MAPS_API
OPENAI_API_KEY
STRIPE_KEY
PAYPAL_CLIENT_ID
PAYPAL_SECRET
```

### Vercel Environment Variables

**Location**: Vercel Dashboard → Your Project → Settings → Environment Variables

**Sync from GitHub Secrets** (automatic via workflow):
- Secrets are passed to Vercel during deployment
- No manual entry needed in Vercel dashboard
- Update in GitHub Secrets only

**For Vercel-specific variables**:
1. Go to Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add variable for Production, Preview, or Development
4. Redeploy to apply changes

---

## 📦 Dependency Management Synchronization

### Adding New Dependencies

```powershell
# Install dependency locally
pnpm add package-name

# Or dev dependency
pnpm add -D package-name

# This updates pnpm-lock.yaml
# Commit both package.json and pnpm-lock.yaml
git add package.json pnpm-lock.yaml
git commit -m "chore: add package-name dependency"
git push origin main
```

**Result**: 
- GitHub receives updated lock file
- Vercel installs same versions during deployment
- All environments use identical dependencies

### Updating Dependencies

```powershell
# Update specific package
pnpm update package-name

# Update all packages
pnpm update

# Commit and push
git add package.json pnpm-lock.yaml
git commit -m "chore: update dependencies"
git push origin main
```

---

## 🚨 Conflict Resolution

### Local Changes Conflict with GitHub

```powershell
# Pull latest changes
git pull origin main

# If conflicts occur, Git will mark them in files:
<<<<<<< HEAD
# # Remote changes
# 
=======
# <<<<<<< HEAD
# Your local changes
# =======
# Remote changes
# >>>>>>> origin/main
>>>>>>> origin/copilot/update-main-with-all-branches

# Edit conflicted files to resolve
# Remove conflict markers, keep desired changes

# Stage resolved files
git add .

# Complete merge
git commit -m "merge: resolve conflicts with main"

# Push merged changes
git push origin main
```

### Prevention Strategy

```powershell
# Always pull before making changes
git pull origin main

# Or use rebase for cleaner history
git pull --rebase origin main
```

---

## 🔍 Monitoring & Verification

### Check Synchronization Status

```powershell
# Check local Git status
git status

# Check commits ahead/behind remote
git log origin/main..HEAD  # Commits not pushed
git log HEAD..origin/main  # Commits not pulled

# Check remote connection
git remote -v

# Check current branch
git branch -a
```

### Verify Vercel Deployment

**Via Dashboard**:
1. Go to https://vercel.com/dashboard
2. Check deployment status (Success/Failed)
3. Click deployment to view details
4. Click "Visit" to see live site

**Via CLI**:
```powershell
# Install Vercel CLI
npm install -g vercel

# Check deployment status
vercel ls
```

### Monitor GitHub Actions

**Via Web**:
1. Go to https://github.com/3000Studios/3000studios-next/actions
2. View workflow runs
3. Click run to see detailed logs

**Via CLI**:
```powershell
# List workflow runs
gh run list

# View specific run
gh run view [run-id]

# Watch run in real-time
gh run watch
```

---

## 🛠️ Troubleshooting Common Issues

### Issue: "Push rejected - non-fast-forward"

**Cause**: Remote has changes you don't have locally

**Solution**:
```powershell
# Pull remote changes first
git pull origin main

# Or rebase
git pull --rebase origin main

# Then push
git push origin main
```

### Issue: "Authentication failed"

**Cause**: GitHub credentials not configured

**Solution**:
```powershell
# Re-authenticate with GitHub CLI
gh auth logout
gh auth login
```

### Issue: "Vercel deployment failed"

**Cause**: Build errors or missing environment variables

**Solution**:
1. Check GitHub Actions logs for errors
2. Run `pnpm build` locally to reproduce
3. Verify environment variables in Vercel dashboard
4. Check build logs in Vercel dashboard

### Issue: "Local dev server not updating"

**Cause**: Cache issues or build errors

**Solution**:
```powershell
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Restart dev server
pnpm dev
```

### Issue: "Files not syncing between environments"

**Cause**: Files in .gitignore or not staged

**Solution**:
```powershell
# Check .gitignore for excluded files
cat .gitignore

# Check which files are tracked
git ls-files

# Force add if needed (carefully!)
git add -f file-name
```

---

## 📁 Files That Should NOT Sync

These files are intentionally excluded from Git (see `.gitignore`):

```
# Local environment files
.env.local
.env
.env*.local

# Dependencies
node_modules/
.pnp/
.pnp.js

# Build output
.next/
out/
build/

# Vercel
.vercel/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/* (except settings.json, tasks.json, etc.)
.idea/
*.swp
*.swo
```

**These files stay local** - never commit them to GitHub.

---

## 🎯 Best Practices for Staying in Sync

### 1. Pull Before Push
Always pull latest changes before pushing:
```powershell
git pull origin main && git push origin main
```

### 2. Commit Frequently
Small, frequent commits are better than large ones:
```powershell
# Good: Multiple small commits
git commit -m "feat: add header component"
git commit -m "style: update header colors"

# Less ideal: One huge commit
git commit -m "update entire homepage"
```

### 3. Use Descriptive Commit Messages
```powershell
# Good
git commit -m "feat: add user authentication with JWT"

# Bad
git commit -m "updates"
```

### 4. Test Before Pushing
```powershell
# Always run before pushing to main
pnpm build && pnpm lint && pnpm typecheck
```

### 5. Use Feature Branches
```powershell
# Create branch for each feature
git checkout -b feature/user-dashboard

# Work on feature, test, then merge
git checkout main
git merge feature/user-dashboard
```

### 6. Keep .env.local in Sync with .env.example
```powershell
# When you add new env variable:
# 1. Add to .env.local (actual value)
# 2. Add to .env.example (placeholder)
# 3. Add to GitHub Secrets (if needed for CI/CD)
# 4. Add to Vercel (if needed for deployment)
```

### 7. Monitor Deployments
- Check GitHub Actions after every push
- Verify Vercel deployment succeeded
- Test live site after production deploy

### 8. Use Automated Sync Scripts
```powershell
# Use provided scripts for safety
.\scripts\secure-sync.ps1      # Secure git sync
.\scripts\auto-sync.ps1        # Automated sync
```

---

## 🔄 Automated Synchronization

### Git Auto-Fetch (VS Code)

Already enabled in `.vscode/settings.json`:
```json
{
  "git.autofetch": true,
  "git.confirmSync": false
}
```

**Result**: VS Code automatically fetches remote changes every few minutes.

### Automated Sync Script

Use the provided script for hassle-free syncing:

```powershell
# Run secure sync (checks auth, commits, pushes)
.\scripts\secure-sync.ps1
```

**What it does**:
1. ✅ Verifies GitHub authentication
2. ✅ Fetches latest changes
3. ✅ Stages all changes
4. ✅ Commits with timestamp
5. ✅ Pushes to remote
6. ✅ Confirms success

### GitHub Actions Auto-Deploy

**File**: `.github/workflows/vercel-deploy.yml`

**Trigger**: Every push to `main` branch

**Actions**:
1. Checkout code
2. Setup Node.js and pnpm
3. Install dependencies
4. Build project
5. Deploy to Vercel production
6. Upload logs

**Result**: Fully automated deployment pipeline.

---

## 📊 Sync Status Dashboard

### Quick Status Check

```powershell
# One-liner status check
git status && git log --oneline -5 && git remote -v
```

**Output shows**:
- Current branch
- Uncommitted changes
- Last 5 commits
- Remote connections

### Comprehensive Health Check

```powershell
# Run all checks
echo "=== Git Status ==="
git status

echo "`n=== Local vs Remote ==="
git log origin/main..HEAD --oneline

echo "`n=== Build Test ==="
pnpm build

echo "`n=== Lint Check ==="
pnpm lint

echo "`n=== Type Check ==="
pnpm typecheck
```

---

## 🎓 Learning Resources

### Git Basics
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

### Vercel
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Deployment Guide](https://vercel.com/docs/deployments/overview)

### VS Code
- [VS Code Git Integration](https://code.visualstudio.com/docs/editor/versioncontrol)
- [VS Code Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings)

---

## 📞 Quick Reference Commands

### Daily Commands
```powershell
# Morning sync
git pull origin main && pnpm dev

# Quick check
git status

# Commit and push
git add . && git commit -m "message" && git push origin main

# Automated sync
.\scripts\secure-sync.ps1

# Build test
pnpm build
```

### Emergency Commands
```powershell
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard origin/main

# View what changed
git diff

# Stash changes temporarily
git stash
git stash pop
```

---

## ✅ Success Checklist

### Your Workflow is Synchronized When:

- [x] VS Code workspace is configured
- [x] GitHub CLI is authenticated
- [x] Git remote is set to GitHub repository
- [x] Vercel is connected to GitHub repository
- [x] GitHub Secrets are configured
- [x] `.env.local` exists with your local credentials
- [x] `.gitignore` excludes sensitive files
- [x] Can push to GitHub without errors
- [x] GitHub Actions workflow runs successfully
- [x] Vercel deploys automatically on push
- [x] Can view live site after deployment
- [x] Local dev server runs on http://localhost:3000

---

## 🎉 You're All Set!

Your workflow is now fully synchronized:

**Local VS Code** ⟷ **GitHub Repository** ⟷ **Vercel Production**

Every change you make follows this path:
1. Edit locally in VS Code
2. Commit to Git
3. Push to GitHub
4. Auto-deploy to Vercel
5. Live in minutes

**No manual steps. No data loss. Everything stays in sync.** 🚀

---

**Questions?** See `QUICK_START.md` for detailed setup or `DEPLOYMENT.md` for deployment-specific guidance.

**Last Updated**: December 14, 2025  
**Maintained By**: 3000 Studios Development Team

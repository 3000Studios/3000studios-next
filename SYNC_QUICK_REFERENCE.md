# ⚡ Quick Reference - Sync Operations

**Purpose**: Fast lookup for common synchronization tasks between VS Code, GitHub, and Vercel

---

## 🚀 Common Daily Commands

### Start Your Day
```powershell
# Pull latest changes and start dev server
git pull origin main && pnpm dev
```

### Save and Sync Changes
```powershell
# Quick commit and push
git add . && git commit -m "your message" && git push origin main
```

### Or Use Automated Script
```powershell
# Secure sync script (checks auth, commits, pushes)
.\scripts\secure-sync.ps1
```

---

## 🔄 Git Operations

### Check Status
```powershell
# See what changed
git status

# See commits not pushed
git log origin/main..HEAD --oneline

# See commits not pulled
git log HEAD..origin/main --oneline
```

### Pull Changes
```powershell
# Standard pull
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase origin main
```

### Commit Changes
```powershell
# Stage all changes
git add .

# Stage specific file
git add path/to/file.tsx

# Commit with message
git commit -m "feat: add new feature"

# Amend last commit
git commit --amend -m "new message"
```

### Push Changes
```powershell
# Push to main
git push origin main

# Push to feature branch
git push origin feature/branch-name

# Force push (use carefully!)
git push -f origin branch-name
```

---

## 🌿 Branch Operations

### Create and Switch Branches
```powershell
# Create and switch to new branch
git checkout -b feature/my-feature

# Switch to existing branch
git checkout branch-name

# Create branch from specific commit
git checkout -b branch-name commit-hash
```

### List Branches
```powershell
# List local branches
git branch

# List all branches (local + remote)
git branch -a

# List remote branches only
git branch -r
```

### Merge Branches
```powershell
# Merge feature into current branch
git merge feature/branch-name

# Abort merge if conflicts
git merge --abort
```

### Delete Branches
```powershell
# Delete local branch
git branch -d branch-name

# Force delete local branch
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

## 🔨 Build and Test

### Development Server
```powershell
# Start dev server (with hot reload)
pnpm dev

# Stop dev server
Ctrl+C
```

### Build Project
```powershell
# Production build
pnpm build

# Start production server
pnpm start
```

### Code Quality
```powershell
# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Run all checks
pnpm build && pnpm lint && pnpm typecheck
```

---

## 🔐 Environment Variables

### Local Development
```powershell
# Create from template
cp .env.example .env.local

# Edit file
code .env.local
```

### Never Commit These Files
```
.env
.env.local
.env*.local
```

### GitHub Secrets
**Location**: Repository Settings → Secrets and variables → Actions

**Add secret**:
1. Go to GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add name and value
5. Click "Add secret"

### Vercel Environment Variables
**Location**: Vercel Dashboard → Project → Settings → Environment Variables

**Or via CLI**:
```powershell
vercel env add VARIABLE_NAME
```

---

## 📦 Dependency Management

### Install Dependencies
```powershell
# Install all dependencies
pnpm install

# Add new dependency
pnpm add package-name

# Add dev dependency
pnpm add -D package-name

# Remove dependency
pnpm remove package-name
```

### Update Dependencies
```powershell
# Update specific package
pnpm update package-name

# Update all packages
pnpm update

# Check outdated packages
pnpm outdated
```

---

## 🚨 Emergency Commands

### Undo Changes

#### Discard Local Changes
```powershell
# Discard changes to specific file
git checkout -- file-name

# Discard all local changes (BE CAREFUL!)
git reset --hard HEAD

# Reset to remote state
git reset --hard origin/main
```

#### Undo Commits
```powershell
# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes
git reset --hard HEAD~1

# Undo last 3 commits, keep changes
git reset --soft HEAD~3
```

#### Stash Changes
```powershell
# Save changes temporarily
git stash

# Save with message
git stash save "work in progress"

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Delete stash
git stash drop stash@{0}
```

### Fix Common Issues

#### Authentication Failed
```powershell
# Re-authenticate GitHub CLI
gh auth logout
gh auth login
```

#### Merge Conflicts
```powershell
# 1. Open conflicted files
# 2. Look for conflict markers:
#    #    Their changes
#    
# 3. Edit to keep desired changes
# 4. Remove conflict markers
# 5. Stage resolved files
git add .
# 6. Complete merge
git commit -m "merge: resolve conflicts"
```

#### Push Rejected
```powershell
# Pull first, then push
git pull origin main
git push origin main

# Or rebase
git pull --rebase origin main
git push origin main
```

#### Deployment Failed
```powershell
# Check build locally
pnpm build

# View GitHub Actions logs
gh run list
gh run view [run-id] --log

# View Vercel logs
vercel logs [deployment-url]
```

---

## 🔍 View Information

### Git Information
```powershell
# View commit history
git log --oneline -10

# View detailed commit info
git show commit-hash

# View changes in commit
git show commit-hash --stat

# View file history
git log --follow -- file-path

# View who changed what
git blame file-name
```

### Remote Information
```powershell
# List remotes
git remote -v

# View remote details
git remote show origin

# View all branches (local + remote)
git branch -a
```

### Diff Operations
```powershell
# View unstaged changes
git diff

# View staged changes
git diff --cached

# View changes in specific file
git diff file-name

# Compare branches
git diff branch1..branch2

# Compare with remote
git diff origin/main
```

---

## 🎯 GitHub CLI Commands

### Repository Operations
```powershell
# View repository info
gh repo view

# Clone repository
gh repo clone 3000Studios/3000studios-next

# Open repo in browser
gh repo view --web
```

### Pull Request Operations
```powershell
# Create PR
gh pr create

# List PRs
gh pr list

# View PR details
gh pr view [number]

# Checkout PR locally
gh pr checkout [number]

# Merge PR
gh pr merge [number]
```

### Workflow Operations
```powershell
# List workflows
gh workflow list

# View workflow runs
gh run list

# View specific run
gh run view [run-id]

# View run logs
gh run view [run-id] --log

# Watch run in real-time
gh run watch
```

---

## 📊 Vercel CLI Commands

### Project Operations
```powershell
# Link to Vercel project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls
```

### Environment Variables
```powershell
# List env variables
vercel env ls

# Add env variable
vercel env add VARIABLE_NAME

# Remove env variable
vercel env rm VARIABLE_NAME
```

### Logs and Debugging
```powershell
# View deployment logs
vercel logs [deployment-url]

# View live logs
vercel logs [deployment-url] --follow
```

---

## 🔄 Complete Sync Workflow

### Standard Workflow
```powershell
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch (optional)
git checkout -b feature/my-feature

# 3. Make changes in VS Code
# (files auto-save, format on save enabled)

# 4. Check what changed
git status

# 5. Stage changes
git add .

# 6. Commit
git commit -m "feat: describe your changes"

# 7. Push
git push origin main
# Or for feature branch:
git push origin feature/my-feature

# 8. Verify deployment
# GitHub Actions: https://github.com/3000Studios/3000studios-next/actions
# Vercel: https://vercel.com/dashboard
```

### Automated Workflow
```powershell
# Use provided script
.\scripts\secure-sync.ps1
# This handles: fetch, stage, commit, push
```

---

## 🎨 VS Code Quick Actions

### Keyboard Shortcuts
```
Ctrl+P              - Quick open file
Ctrl+Shift+P        - Command palette
Ctrl+`              - Toggle terminal
Ctrl+Shift+G        - Source control panel
Ctrl+Shift+F        - Search in files
F2                  - Rename symbol
F12                 - Go to definition
Ctrl+/              - Toggle comment
Ctrl+D              - Select next occurrence
Alt+↑/↓             - Move line up/down
Ctrl+Shift+L        - Select all occurrences
Ctrl+B              - Toggle sidebar
```

### Git in VS Code
```
1. Open Source Control panel (Ctrl+Shift+G)
2. View changed files
3. Click + to stage files
4. Enter commit message
5. Press Ctrl+Enter to commit
6. Click ... → Push to push changes
```

---

## 📋 Pre-Push Checklist

Before pushing to main:

```powershell
# 1. Check status
git status

# 2. Run build
pnpm build

# 3. Run linting
pnpm lint

# 4. Run type check
pnpm typecheck

# 5. Review changes
git diff

# 6. Commit
git add . && git commit -m "message"

# 7. Push
git push origin main
```

---

## 🆘 Help and Resources

### Get Help
```powershell
# Git help
git help
git help [command]

# GitHub CLI help
gh help
gh [command] --help

# Vercel CLI help
vercel help
vercel [command] --help
```

### Documentation Links
- [Git Docs](https://git-scm.com/doc)
- [GitHub CLI](https://cli.github.com/manual/)
- [Vercel CLI](https://vercel.com/docs/cli)
- [pnpm](https://pnpm.io/cli/add)

### Project Documentation
- `README.md` - Project overview
- `WORKFLOW_SYNC_GUIDE.md` - Comprehensive sync guide
- `VSCODE_INTEGRATION_GUIDE.md` - VS Code setup
- `DEPLOYMENT.md` - Deployment instructions
- `QUICK_START.md` - Getting started guide

---

## 💡 Pro Tips

### Aliases for Common Commands

Add to PowerShell profile (`$PROFILE`):

```powershell
# Git aliases
function gst { git status }
function gco { git checkout $args }
function gcm { git commit -m $args }
function gp { git push origin main }
function gl { git pull origin main }

# Project aliases
function dev { pnpm dev }
function build { pnpm build }
function lint { pnpm lint }
```

Reload: `. $PROFILE`

### Git Aliases

Add to `~/.gitconfig`:

```ini
[alias]
  st = status
  co = checkout
  br = branch
  cm = commit -m
  lg = log --oneline --graph --decorate
  last = log -1 HEAD
  unstage = reset HEAD --
```

Use: `git st` instead of `git status`

---

## ✅ Quick Health Check

Run this to verify everything is synced:

```powershell
# Complete health check
Write-Host "=== Git Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Commits Not Pushed ===" -ForegroundColor Cyan
git log origin/main..HEAD --oneline

Write-Host "`n=== Remote Connection ===" -ForegroundColor Cyan
git remote -v

Write-Host "`n=== GitHub Auth ===" -ForegroundColor Cyan
gh auth status

Write-Host "`n=== Build Test ===" -ForegroundColor Cyan
pnpm build
```

**Expected Results**:
- ✅ Working tree clean (or shows expected changes)
- ✅ No unpushed commits (or ready to push)
- ✅ Remote points to GitHub
- ✅ GitHub CLI authenticated
- ✅ Build succeeds

---

## 🎉 You're All Set!

Keep this reference handy for quick lookups. For detailed explanations, see:
- `WORKFLOW_SYNC_GUIDE.md` - Complete synchronization guide
- `VSCODE_INTEGRATION_GUIDE.md` - VS Code configuration
- `DEPLOYMENT.md` - Deployment procedures

**Happy syncing!** 🚀

---

**Last Updated**: December 14, 2025  
**Maintained By**: 3000 Studios Development Team

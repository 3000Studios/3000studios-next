# 🔐 Backup & Sync System - 3000 Studios

## Overview

This system ensures your codebase is always protected with automated backups and synchronized across all environments (local, GitHub, Vercel).

---

## 🛡️ Backup System

### Automated Backup Creation

The backup system creates timestamped snapshots of your entire codebase before any major changes or deployments.

#### Quick Start

```bash
# Create a backup before deployment
./scripts/create-backup.sh pre-deployment

# Create a backup before making changes
./scripts/create-backup.sh before-feature-x

# Create a general backup
./scripts/create-backup.sh
```

### What Gets Backed Up

- ✅ Complete `src/` directory (all source code)
- ✅ `public/` directory (all assets)
- ✅ `.github/` workflows and configurations
- ✅ `package.json` and `pnpm-lock.yaml` (dependencies)
- ✅ Configuration files (`next.config.ts`, `tsconfig.json`, etc.)
- ✅ `.env.example` (environment template)
- ✅ Git commit hash and branch information

### Backup Structure

```
backups/
├── pre-deployment_20241212_082030/
│   ├── src/
│   ├── public/
│   ├── .github/
│   ├── package.json
│   ├── next.config.ts
│   └── BACKUP_MANIFEST.md
├── pre-deployment_20241212_082030.tar.gz
└── ... (keeps last 10 backups)
```

### Backup Manifest

Each backup includes a `BACKUP_MANIFEST.md` with:
- Timestamp and backup name
- Git branch and commit hash
- List of backed up files
- Restore instructions
- Git restore command

### Automatic Cleanup

- Keeps the **last 10 backups**
- Automatically deletes older backups
- Compressed archives for space efficiency

---

## 🔄 Sync System

### Three-Way Sync: Local ↔ GitHub ↔ Vercel

The sync system ensures perfect synchronization between:
1. **Local Repository** (your working directory)
2. **GitHub Remote** (origin)
3. **Vercel Deployment** (production)

### Sync Repository Script

Automatically syncs all changes across environments.

```bash
# Run full sync
./scripts/sync-repository.sh
```

#### What It Does

1. ✅ **Creates backup** (if uncommitted changes exist)
2. ✅ **Fetches latest** from GitHub
3. ✅ **Compares** local vs remote commits
4. ✅ **Pulls changes** if behind remote
5. ✅ **Commits** any uncommitted changes
6. ✅ **Pushes** to GitHub
7. ✅ **Triggers Vercel deploy** (if on main branch)
8. ✅ **Verifies** sync status

#### Sync Flow Diagram

```
┌──────────────┐
│    LOCAL     │
│  Repository  │
└──────┬───────┘
       │
       │ git push/pull
       │
       ▼
┌──────────────┐       GitHub Actions
│    GITHUB    │──────────────────┐
│   (origin)   │                  │
└──────────────┘                  │
                                  ▼
                         ┌─────────────────┐
                         │     VERCEL      │
                         │   (Production)  │
                         │ 3000studios.com │
                         └─────────────────┘
```

### Verify Sync Script

Check if everything is in sync without making changes.

```bash
# Verify sync status
./scripts/verify-sync.sh
```

#### Verification Checks

1. ✅ Uncommitted changes
2. ✅ Local vs GitHub commits
3. ✅ GitHub Actions status
4. ✅ Production branch status
5. ✅ Critical files integrity

---

## 📋 Common Workflows

### Before Making Changes

```bash
# 1. Verify current sync status
./scripts/verify-sync.sh

# 2. Create backup
./scripts/create-backup.sh before-changes

# 3. Make your changes...
```

### After Making Changes

```bash
# 1. Test your changes
pnpm build
pnpm lint

# 2. Create backup
./scripts/create-backup.sh after-changes

# 3. Sync to GitHub and Vercel
./scripts/sync-repository.sh
```

### Before Deployment

```bash
# 1. Create pre-deployment backup
./scripts/create-backup.sh pre-deployment

# 2. Verify sync status
./scripts/verify-sync.sh

# 3. Sync everything
./scripts/sync-repository.sh

# 4. If on main branch, deployment will auto-trigger
```

### Restoring from Backup

If something goes wrong, restore from a backup:

```bash
# 1. List available backups
ls -lt backups/

# 2. Choose a backup and extract
cd backups
tar -xzf pre-deployment_20241212_082030.tar.gz

# 3. Follow restore instructions in BACKUP_MANIFEST.md
cat pre-deployment_20241212_082030/BACKUP_MANIFEST.md

# 4. Copy files back
cp -r pre-deployment_20241212_082030/src ../
cp -r pre-deployment_20241212_082030/public ../
# ... etc

# 5. Reinstall dependencies
cd ..
pnpm install

# 6. Test
pnpm build
```

---

## 🚨 Emergency Recovery

### If Local Repository Is Broken

```bash
# Option 1: Restore from backup
./scripts/create-backup.sh emergency
# Then restore as above

# Option 2: Clone fresh from GitHub
cd ..
git clone https://github.com/3000Studios/3000studios-next.git 3000studios-fresh
cd 3000studios-fresh
pnpm install
```

### If GitHub Is Ahead (Fast-Forward Failed)

```bash
# 1. Create backup first
./scripts/create-backup.sh before-rebase

# 2. Rebase your local changes
git pull --rebase origin main

# 3. Resolve any conflicts

# 4. Force sync
./scripts/sync-repository.sh
```

### If Deployment Fails

```bash
# 1. Check deployment logs
# Visit: https://vercel.com/3000studios/3000studios-next

# 2. If code is the issue, restore from backup
# (Follow restore instructions above)

# 3. If environment variables are missing
# Check: ENV_CHECKLIST.md

# 4. Retry deployment
# Push a commit to main branch
```

---

## 🔧 Configuration

### Customizing Backup Retention

Edit `scripts/create-backup.sh`:

```bash
# Change this line to keep more/fewer backups
ls -t *.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm -f
#                                            ^^ Change 11 to (desired_count + 1)
```

### Customizing Sync Behavior

Edit `scripts/sync-repository.sh`:

```bash
# Change auto-commit message format
COMMIT_MSG="chore: sync local changes $(date +"%Y-%m-%d %H:%M:%S")"
```

---

## 📊 Monitoring

### Check Sync Status Anytime

```bash
# Quick verification (exits with code 0 if synced, 1 if not)
./scripts/verify-sync.sh
```

### GitHub Actions Dashboard

Monitor deployments:
- **URL:** https://github.com/3000Studios/3000studios-next/actions
- **Auto-triggers:** On every push to `main` branch
- **Typical duration:** 60-90 seconds

### Vercel Dashboard

Monitor production deployments:
- **URL:** https://vercel.com/3000studios/3000studios-next
- **Live site:** https://3000studios.com
- **Deployment logs:** Available in dashboard

---

## ✅ Best Practices

### Daily Workflow

```bash
# Morning: Start fresh
./scripts/sync-repository.sh

# During work: Verify frequently
./scripts/verify-sync.sh

# Before breaks: Create backup
./scripts/create-backup.sh checkpoint

# End of day: Full sync
./scripts/sync-repository.sh
```

### Before Major Changes

1. ✅ Create backup with descriptive name
2. ✅ Verify sync status
3. ✅ Work on feature branch (not main)
4. ✅ Test thoroughly
5. ✅ Create another backup
6. ✅ Merge to main
7. ✅ Monitor deployment

### Disaster Prevention

- 🔄 **Sync frequently** (at least daily)
- 💾 **Backup before big changes**
- 🧪 **Test before merging to main**
- 📊 **Monitor deployments**
- 📋 **Keep backups for 30 days minimum**

---

## 🎯 Quick Reference

```bash
# Create backup
./scripts/create-backup.sh [name]

# Full sync (local → GitHub → Vercel)
./scripts/sync-repository.sh

# Verify sync status
./scripts/verify-sync.sh

# List backups
ls -lt backups/

# Extract backup
tar -xzf backups/backup-name.tar.gz
```

---

## 🔗 Related Documentation

- **Environment Setup:** `ENV_CHECKLIST.md`
- **Deployment Guide:** `MERGE_AND_DEPLOY.md`
- **Real-Time Sync:** `REALTIME_SYNC_GUIDE.md`
- **Quick Reference:** `BOSS_MAN_J_QUICK_REFERENCE.md`

---

## ✅ System Status

- ✅ Backup system ready
- ✅ Sync system ready
- ✅ Verification system ready
- ✅ All scripts executable
- ✅ `.gitignore` configured to exclude backups

**Your codebase is now protected and always in sync!** 🛡️

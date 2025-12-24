# 🎯 Release Scripts - Quick Start Guide

**Created**: December 14, 2025  
**For**: Safe PR merging with automated verification

---

## ⚡ TL;DR - Get Started in 30 Seconds

```powershell
# Windows/PowerShell - Test first
.\scripts\release-merge.ps1 -DryRun

# Windows/PowerShell - Execute
.\scripts\release-merge.ps1

# Linux/macOS - Test first
./scripts/release-merge.sh --dry-run

# Linux/macOS - Execute
./scripts/release-merge.sh
```

**What it does**: Safely merges PRs #35, #34, #31, #33 with full testing and automatic backups.

---

## ✅ Pre-Flight Checklist (2 minutes)

Before running the script, verify:

```bash
# 1. Check you're in project root
pwd  # Should show: .../3000studios-next

# 2. Verify tools installed
git --version      # ✅ Should be 2.x+
gh auth status     # ✅ Should show "Logged in"
pnpm --version     # ✅ Should be 8.x+
node --version     # ✅ Should be 18.x+

# 3. Clean working tree
git status         # ✅ Should show "nothing to commit"
```

**All green?** You're ready to run the script.

---

## 🚀 First Run - Always Use Dry Run

```powershell
# PowerShell
.\scripts\release-merge.ps1 -DryRun

# Bash
./scripts/release-merge.sh --dry-run
```

**Review the output**:
- Shows what WOULD happen
- No actual changes made
- Takes ~2 minutes

**If output looks good**, proceed to actual run.

---

## 🔥 Production Run

```powershell
# PowerShell
.\scripts\release-merge.ps1

# Bash
./scripts/release-merge.sh
```

**What happens**:
1. Creates backups (branch + tag)
2. Tests each PR individually
3. Merges PRs in order
4. Runs final verification
5. Pushes to main (triggers Vercel)

**Duration**: ~15-25 minutes  
**Interaction**: Mostly hands-off (watch the output)

---

## 📊 What to Expect

### Phase 1: Freeze & Verify (~2 min)
```
🔷 PHASE 1: Freeze & Verify
   → Checking current branch...
   ✅ Working tree is clean
   → Creating backup branch: backup/main-before-merge-2025-12-14
   ✅ Backup branch created
   → Creating backup tag: v-pre-merge-2025-12-14
   ✅ Backup tag created
   ✅ PHASE 1 Complete
```

### Phase 2: Verify PRs (~10-15 min)
```
🔷 PHASE 2: Verify PRs Individually
──────────────────────────────────────
Testing PR #35: ESLint 9 + TS fixes
──────────────────────────────────────
   → Checking out PR #35...
   → Installing dependencies...
   → Running linter...
   ✅ Lint passed
   → Running type check...
   ✅ Type check passed
   → Building project...
   ✅ Build passed
   ✅ PR #35 verified successfully

[Repeats for PRs #34, #31, #33]

✅ PHASE 2 Complete: All PRs verified
```

### Phase 3: Controlled Merge (~5-10 min)
```
🔷 PHASE 3: Controlled Merge
   → Creating release branch: release/merge-2025-12-14
   ✅ Release branch created
──────────────────────────────────────
Merging PR #35
──────────────────────────────────────
   → Merging with --no-ff...
   ✅ Merged PR #35

[Repeats for PRs #34, #31, #33]

──────────────────────────────────────
Running final verification gate
──────────────────────────────────────
   → Running linter...
   ✅ Lint passed
   → Running type check...
   ✅ Type check passed
   → Building project...
   ✅ Build passed
   ✅ All final checks passed!
──────────────────────────────────────
Merging to main
──────────────────────────────────────
   → Merging release branch...
   ✅ Release branch merged to main
   → Pushing to origin/main (triggers Vercel)...
   ✅ Pushed to main - Vercel deployment initiated
   ✅ PHASE 3 Complete
```

### Success!
```
════════════════════════════════════════
✅ SUCCESS: All phases completed
════════════════════════════════════════

Backup created:
  Branch: backup/main-before-merge-2025-12-14
  Tag: v-pre-merge-2025-12-14

Deployment:
  Vercel will deploy main branch in ~5-7 minutes
  Monitor at: https://vercel.com/dashboard

To rollback if needed:
  Run: git checkout v-pre-merge-2025-12-14 && \
       git push origin v-pre-merge-2025-12-14:main --force
```

---

## 🚨 If Something Goes Wrong

### Script Stops During Phase 1
**Error**: "Working tree is not clean"

**Fix**:
```bash
git status             # See what's uncommitted
git add . && git commit -m "save work"  # Commit it
# OR
git stash             # Stash it
# Then re-run script
```

### Script Stops During Phase 2
**Error**: "PR #XX failed at [stage]"

**What it means**: That PR has issues (lint/typecheck/build failing)

**Fix**:
1. The PR needs to be fixed before merging
2. Checkout that PR locally
3. Fix the issues
4. Push fixes to PR
5. Re-run the release script

**Script will show**: Which PR and which stage failed

### Script Stops During Phase 3
**Error**: "Merge conflict"

**Fix**:
```bash
git merge --abort              # Abort the merge
git checkout main              # Go back to main
git branch -D release/merge-*  # Delete release branch
# Fix conflicts in PRs manually, then re-run
```

---

## 🔄 Rollback (If Deployment Breaks)

**Scenario**: Script succeeded, but production site has issues

**Solution**: Use the backup created in Phase 1

```bash
# Option 1: Use backup tag (recommended)
git checkout v-pre-merge-2025-12-14
git push origin v-pre-merge-2025-12-14:main --force

# Option 2: Use backup branch
git checkout backup/main-before-merge-2025-12-14
git push origin backup/main-before-merge-2025-12-14:main --force
```

**Result**: Vercel automatically redeploys the previous state (~5-7 minutes)

---

## 💡 Pro Tips

### Tip 1: Always Dry Run First
```powershell
# ALWAYS do this first
.\scripts\release-merge.ps1 -DryRun

# Review output carefully
# If it looks good, run for real
.\scripts\release-merge.ps1
```

### Tip 2: Keep Terminal Open
Don't close the terminal window while script is running. You'll lose progress information.

### Tip 3: Monitor After Merge
After script completes:
1. Go to https://vercel.com/dashboard
2. Watch deployment progress
3. Click deployment when done
4. Test live site

### Tip 4: Keep Backups for 48 Hours
Don't delete backup branches/tags immediately. Keep them for at least 48 hours in case you need to rollback.

---

## 📝 Common Questions

### Q: What if I only want to test one PR?
**A**: The script tests all 4 PRs. To test just one, checkout that PR manually and run standard tests:
```bash
gh pr checkout 35
pnpm install --frozen-lockfile
pnpm lint && pnpm typecheck && pnpm build
```

### Q: Can I merge PRs in different order?
**A**: Not with this script. The order is fixed: #35, #34, #31, #33. To change order, edit the script or merge manually.

### Q: What if a PR doesn't exist?
**A**: Script will fail at Phase 2 when trying to checkout that PR. All PRs must exist.

### Q: How do I skip tests?
**A**: Add flag:
```powershell
# PowerShell
.\scripts\release-merge.ps1 -SkipTests

# Bash
./scripts/release-merge.sh --skip-tests
```
**Warning**: Not recommended. Only use if you've manually verified all PRs.

### Q: Can I stop the script mid-execution?
**A**: Press `Ctrl+C` to stop. Then check your state:
```bash
git status
git branch
```
Clean up if needed:
```bash
git merge --abort      # If in middle of merge
git checkout main
```

---

## 🎯 After Successful Merge

**Immediate** (~5-10 minutes):
- [ ] Monitor Vercel deployment
- [ ] Check dashboard for "Ready" status
- [ ] Visit production URL
- [ ] Check browser console for errors

**Within 1 Hour**:
- [ ] Test key functionality on production
- [ ] Monitor error logs
- [ ] Check analytics

**Within 48 Hours**:
- [ ] Monitor for any production issues
- [ ] Can delete release branch: `git branch -D release/merge-YYYY-MM-DD`
- [ ] Keep backup branch/tag for potential rollback

---

## 📞 Need Help?

### For Script Issues
See detailed guide: `scripts/RELEASE_SCRIPTS_README.md`

### For Deployment Issues
See: `DEPLOYMENT.md` - Troubleshooting section

### For Environment Issues
See: `ENV_SYNC_GUIDE.md` - Vercel section

### Quick Command Reference
See: `SYNC_QUICK_REFERENCE.md`

---

## ✅ Success Checklist

After script completes, verify:

- [ ] Script showed "SUCCESS: All phases completed"
- [ ] Backup branch exists: `git branch -a | grep backup`
- [ ] Backup tag exists: `git tag -l "v-pre-merge-*"`
- [ ] Main branch updated: `git log --oneline -5`
- [ ] Vercel deployment triggered
- [ ] Production site loads without errors
- [ ] No console errors in browser
- [ ] All pages accessible

**All checked?** You're done! 🎉

---

**Quick Reference Card**:

```
DRY RUN:  .\scripts\release-merge.ps1 -DryRun
EXECUTE:  .\scripts\release-merge.ps1
ROLLBACK: git checkout v-pre-merge-YYYY-MM-DD && \
          git push origin v-pre-merge-YYYY-MM-DD:main --force
STATUS:   git status && git branch
BACKUPS:  git tag -l "v-pre-merge-*"
```

---

**Last Updated**: December 14, 2025  
**Script Version**: 1.0.0  
**Maintained By**: 3000 Studios Development Team

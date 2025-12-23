# 🚨 VERCEL ENVIRONMENT FIX - IMMEDIATE SOLUTION

## Boss Man J - Run These Commands NOW

The PowerShell script path issue is because the script needs to be run differently. Here's the fix:

---

## ✅ OPTION 1: Direct PowerShell Commands (FASTEST)

Copy and paste these commands one at a time in PowerShell:

```powershell
# Navigate to project
cd C:\DEV\3000studios-next

# Step 1: Remove the broken reference
vercel env rm NEXT_PUBLIC_SITE_URL production --yes

# Step 2: Add it back correctly (YOU WILL BE PROMPTED)
vercel env add NEXT_PUBLIC_SITE_URL production

# When prompted for value, type: https://3000studios.com
# When asked "Mark as sensitive?", type: n  (or just press Enter for No)

# Step 3: Verify it's correct
vercel env ls

# Step 4: Deploy
vercel --prod --yes
```

---

## ✅ OPTION 2: Run PowerShell Script Correctly

The issue is PowerShell execution policy. Run this first:

```powershell
# Set execution policy for current session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Now run the script
cd C:\DEV\3000studios-next
& ".\scripts\fix-vercel-env.ps1"
```

---

## ✅ OPTION 3: Via Vercel Dashboard (NO CLI NEEDED)

If CLI continues to have issues:

1. Go to: https://vercel.com/3000studios/3000studios-next/settings/environment-variables
2. Find `NEXT_PUBLIC_SITE_URL` in the list
3. Click the **three dots** (•••) next to it
4. Click **"Delete"**
5. Click **"Add New Variable"**
6. Fill in:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://3000studios.com`
   - **Environments**: Check "Production"
   - **Mark as Sensitive**: **LEAVE UNCHECKED** ❌
7. Click **"Save"**
8. Go to Deployments tab
9. Click **"Redeploy"** on the latest deployment

---

## 🔍 Why It's Not Working

The error message shows Vercel is still trying to reference a secret:

```
NEXT_PUBLIC_SITE_URL → references → next_public_site_url (doesn't exist)
```

This means the variable wasn't properly removed. It's still stored as a reference.

---

## ✅ NUCLEAR OPTION (If nothing else works)

Run these Vercel CLI commands to completely reset:

```powershell
# Remove from ALL environments
vercel env rm NEXT_PUBLIC_SITE_URL production --yes
vercel env rm NEXT_PUBLIC_SITE_URL preview --yes
vercel env rm NEXT_PUBLIC_SITE_URL development --yes

# Add back ONLY to production with literal value
vercel env add NEXT_PUBLIC_SITE_URL production
# Type: https://3000studios.com
# Mark as sensitive: n

# Redeploy
vercel --prod --yes --force
```

---

## 📋 Expected Output After Fix

When you run `vercel env ls`, you should see:

```
NEXT_PUBLIC_SITE_URL
  Production: Encrypted
  (showing as encrypted value, NOT @next_public_site_url)
```

The key is that it should show as "Encrypted" but NOT show any @ symbol or reference to another secret.

---

## 🎯 Quick Troubleshooting

### If PowerShell says "script not recognized":

```powershell
# Check if file exists
Test-Path "C:\DEV\3000studios-next\scripts\fix-vercel-env.ps1"

# If True, run with full path:
& "C:\DEV\3000studios-next\scripts\fix-vercel-env.ps1"

# Or bypass execution policy:
PowerShell -ExecutionPolicy Bypass -File "C:\DEV\3000studios-next\scripts\fix-vercel-env.ps1"
```

### If Vercel CLI says "not authenticated":

```powershell
vercel login
# Follow the browser authentication
# Then retry the commands
```

### If variable won't delete:

```powershell
# Force remove from all targets
vercel env rm NEXT_PUBLIC_SITE_URL --yes

# Then try adding again
vercel env add NEXT_PUBLIC_SITE_URL production
```

---

## 🚀 After Successful Fix

You'll know it worked when:

1. ✅ `vercel env ls` shows NEXT_PUBLIC_SITE_URL without @ reference
2. ✅ Deploy completes without "references Secret" error
3. ✅ Site loads at https://3000studios.com

---

## 💡 Recommended Steps RIGHT NOW:

1. Open PowerShell as Administrator
2. Run: `cd C:\DEV\3000studios-next`
3. Run: `vercel env rm NEXT_PUBLIC_SITE_URL production --yes`
4. Run: `vercel env add NEXT_PUBLIC_SITE_URL production`
5. Type: `https://3000studios.com`
6. Type: `n` (for "Mark as sensitive")
7. Run: `vercel --prod --yes`

---

**If you get stuck, use the Dashboard method (Option 3) - it's the most reliable!**

# 🔄 Vercel Complete Environment Reset & Deploy

## Overview

This guide covers the **complete reset and reconfiguration** of all Vercel environment variables for the 3000 Studios Next.js application.

**Use this when:**
- Starting fresh with Vercel configuration
- Fixing multiple environment variable issues
- Migrating to new Vercel project
- Resolving circular reference errors
- Adding all required environment variables at once

---

## 🚀 Quick Start

### Method 1: Automated Script (Recommended)

**PowerShell (Windows):**
```powershell
cd C:\DEV\3000studios-next
.\scripts\vercel-reset-and-deploy.ps1
```

**Or with execution policy bypass:**
```powershell
PowerShell -ExecutionPolicy Bypass -File ".\scripts\vercel-reset-and-deploy.ps1"
```

**Or right-click → Run with PowerShell:**
- Navigate to `scripts` folder
- Right-click `vercel-reset-and-deploy.ps1`
- Select "Run with PowerShell"

---

## 📋 What the Script Does

### 1. Project Setup
- ✅ Navigates to project root (`C:\DEV\3000studios-next`)
- ✅ Verifies Vercel CLI authentication
- ✅ Removes local `.vercel` directory (clears cache)
- ✅ Re-links project to Vercel

### 2. Environment Cleanup
- ✅ Removes `NEXT_PUBLIC_SITE_URL` from all environments
- ✅ Removes `next_public_site_url` (broken reference) from all environments
- ✅ Ensures clean state with no circular dependencies

### 3. Required Variables
- ✅ `NEXT_PUBLIC_SITE_URL` → `https://3000studios.com` (literal value, NOT sensitive)
- ✅ `ADMIN_EMAIL` → Your admin email
- ✅ `ADMIN_PASSWORD` → Your admin password

### 4. API Keys (Optional, Interactive)

The script will prompt you for each of these variables:

**AI Services:**
- `OPENAI_API_KEY`
- `CLAUDE_API_KEY`
- `CLAUDE_ALT_KEY`
- `GEMINI_API_KEY`
- `GEMINI_ALT_KEY`
- `AI_GATEWAY_API_KEY`

**Google Services:**
- `GOOGLE_CLOUD_API_KEY`
- `GOOGLE_MAPS_API_KEY`

**Payment:**
- `PAYPAL_CLIENT_ID`
- `PAYPAL_SECRET`

**Other Services:**
- `MXBAI_API_KEY`
- `MXBAI_STORE_ID`
- `SHADOW_PASSWORD`
- `SHADOW_SECRET`
- `GITHUB3000_PAT_TOKEN`

**Database:**
- `MONGO_PUBLIC_KEY`
- `MONGO_PRIVATE_KEY`
- `MONGO_IP`

### 5. Deployment
- ✅ Verifies all environment variables
- ✅ Lists current configuration
- ✅ Optionally deploys to production

---

## ⚠️ Important Notes

### Critical: NEXT_PUBLIC_SITE_URL

When prompted for `NEXT_PUBLIC_SITE_URL`:

```
What's the value of NEXT_PUBLIC_SITE_URL?
Answer: https://3000studios.com

Mark as sensitive?
Answer: n (or just press Enter)
```

**Why this matters:**
- ✅ This must be a **literal value** (not a secret reference)
- ✅ Must NOT be marked as sensitive (it's a public URL)
- ✅ Marking it correctly prevents circular dependency errors

### Interactive Prompts

The script will ask for each API key individually. You have three options:

1. **`y` (yes)** - Add this variable (you'll be prompted for the value)
2. **`n` (no)** - Skip this variable
3. **`s` (skip all)** - Skip this and all remaining variables

**Tip:** If you don't have a particular API key ready, press `n` to skip it and add it later via Vercel Dashboard.

---

## 🔍 Step-by-Step Execution

### Step 1: Pre-Flight Checks
```
✅ Vercel CLI installed
✅ Authenticated with Vercel
✅ Project directory exists
```

### Step 2: Clean Slate
```
🗑️ Remove .vercel directory
🔗 Re-link to Vercel project
🧹 Remove problematic env vars
```

### Step 3: Add Core Variables
```
➕ NEXT_PUBLIC_SITE_URL (literal value)
➕ ADMIN_EMAIL
➕ ADMIN_PASSWORD
```

### Step 4: Add API Keys (Interactive)
```
For each variable:
  - Prompt: Add this variable? [y/n/s]
  - If yes: Enter value and environments
  - If no: Skip to next
  - If skip all: Skip remaining
```

### Step 5: Verify
```
📋 List all environment variables
🔍 Review configuration
```

### Step 6: Deploy
```
🚀 Deploy to production (optional)
✅ Site live at https://3000studios.com
```

---

## 🛟 Troubleshooting

### Script Execution Policy Error

**Error:**
```
cannot be loaded because running scripts is disabled
```

**Fix:**
```powershell
PowerShell -ExecutionPolicy Bypass -File ".\scripts\vercel-reset-and-deploy.ps1"
```

### Not Authenticated Error

**Error:**
```
❌ Not authenticated with Vercel
```

**Fix:**
```bash
vercel login
```

### Project Not Found

**Error:**
```
⚠️ Directory C:\DEV\3000studios-next not found
```

**Fix:**
- Edit script and change project path
- Or run from correct directory

### Variable Already Exists

**Error:**
```
Environment Variable "X" already exists
```

**Fix:**
- Script automatically removes duplicates
- Or manually remove via `vercel env rm X production --yes`

### Deployment Fails

**Error:**
```
❌ Deployment failed
```

**Fix:**
1. Check build logs: `vercel logs`
2. Verify all required environment variables are set
3. Check for TypeScript errors
4. Deploy manually: `vercel --prod --yes`

---

## 📊 Environment Variable Checklist

### Required (Must Have)
- [x] `NEXT_PUBLIC_SITE_URL` - `https://3000studios.com`

### Authentication
- [ ] `ADMIN_EMAIL`
- [ ] `ADMIN_PASSWORD`

### AI Services (At Least One)
- [ ] `OPENAI_API_KEY`
- [ ] `CLAUDE_API_KEY`
- [ ] `GEMINI_API_KEY`

### Google Services
- [ ] `GOOGLE_MAPS_API_KEY`

### Payment (For Store)
- [ ] `PAYPAL_CLIENT_ID`
- [ ] `PAYPAL_SECRET`

### Database
- [ ] `MONGO_PUBLIC_KEY`
- [ ] `MONGO_PRIVATE_KEY`
- [ ] `MONGO_IP`

### Optional
- [ ] `CLAUDE_ALT_KEY`
- [ ] `GEMINI_ALT_KEY`
- [ ] `GOOGLE_CLOUD_API_KEY`
- [ ] `AI_GATEWAY_API_KEY`
- [ ] `MXBAI_API_KEY`
- [ ] `MXBAI_STORE_ID`
- [ ] `SHADOW_PASSWORD`
- [ ] `SHADOW_SECRET`
- [ ] `GITHUB3000_PAT_TOKEN`

---

## 🎯 Manual Alternative (Dashboard)

If you prefer to use Vercel Dashboard:

### Step 1: Clean Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: `3000studios-next`
3. Go to **Settings → Environment Variables**
4. Delete `NEXT_PUBLIC_SITE_URL` from all environments
5. Delete any variables with `@secret` references

### Step 2: Add Variables
1. Click **Add New** for each variable
2. Name: Variable name (e.g., `NEXT_PUBLIC_SITE_URL`)
3. Value: Actual value (e.g., `https://3000studios.com`)
4. Environments: Select Production, Preview, Development
5. **Sensitive:** Uncheck for `NEXT_PUBLIC_SITE_URL`, check for API keys
6. Click **Save**

### Step 3: Deploy
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Check **Use existing Build Cache**: Off
4. Click **Redeploy**

---

## ✅ Success Indicators

After running the script, you should see:

```
╔════════════════════════════════════════════════════════╗
║   ENVIRONMENT RESET & DEPLOYMENT COMPLETE              ║
╠════════════════════════════════════════════════════════╣
║   ✅ Environment variables configured                  ║
║   ✅ NEXT_PUBLIC_SITE_URL fixed (literal value)        ║
║   ✅ All API keys added to environments                ║
║   ✅ Project linked to Vercel                          ║
╚════════════════════════════════════════════════════════╝
```

**Verification:**
1. ✅ Site loads: https://3000studios.com
2. ✅ No build errors in Vercel logs
3. ✅ All 9 pages accessible (Home, Store, Projects, etc.)
4. ✅ API routes working (check /api/health)
5. ✅ Environment variables listed correctly: `vercel env ls`

---

## 🚀 Post-Deployment Steps

1. **Test the Site**
   ```bash
   curl https://3000studios.com
   curl https://3000studios.com/api/health
   ```

2. **Verify All Pages**
   - Home: `/`
   - Store: `/store`
   - Projects: `/projects`
   - Portfolio: `/portfolio`
   - Live: `/live`
   - Blog: `/blog`
   - Contact: `/contact`
   - Matrix: `/matrix`
   - Login: `/login`

3. **Test Integrations**
   - AI chat functionality
   - Google Maps on contact page
   - PayPal checkout on store
   - Admin dashboard login

4. **Monitor Logs**
   ```bash
   vercel logs --prod
   ```

---

## 📝 Maintenance

### Adding New Variables Later

```bash
# Single environment
vercel env add NEW_VARIABLE production

# All environments
vercel env add NEW_VARIABLE production
vercel env add NEW_VARIABLE preview
vercel env add NEW_VARIABLE development
```

### Updating Existing Variables

```bash
# Remove old
vercel env rm VARIABLE_NAME production --yes

# Add new
vercel env add VARIABLE_NAME production
```

### Listing Variables

```bash
# List all
vercel env ls

# Pull to local .env file
vercel env pull .env.local
```

---

## 🔒 Security Best Practices

1. ✅ **Never commit API keys** to repository
2. ✅ **Mark sensitive data** as sensitive in Vercel
3. ✅ **Use different keys** for production/preview/development
4. ✅ **Rotate keys regularly** (every 90 days)
5. ✅ **Audit environment variables** monthly
6. ✅ **Use secret references** only when necessary (not for `NEXT_PUBLIC_SITE_URL`)

---

## 🆘 Need Help?

**Script Issues:**
- See `VERCEL_FIX_NOW.md` for alternative methods
- See `QUICK_FIX_COMMANDS.md` for manual commands
- See `VERCEL_ENV_FIX.md` for detailed troubleshooting

**Deployment Issues:**
- Check `MERGE_AND_DEPLOY.md` for deployment guide
- Check `PRODUCTION_READY.md` for status checklist
- Check `ENV_CHECKLIST.md` for required variables

**General Help:**
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Issues: https://github.com/3000Studios/3000studios-next/issues

---

## ✨ Script Features

- ✅ Fully interactive (prompts for each value)
- ✅ Color-coded output (easy to read)
- ✅ Error handling (graceful failures)
- ✅ Skip options (configure what you need)
- ✅ Verification steps (ensures correctness)
- ✅ Optional deployment (deploy when ready)
- ✅ Comprehensive logging (see what's happening)

---

**Last Updated:** 2025-12-14
**Script Version:** 1.0.0
**Author:** Shadow Overlord / Copilot
**Repository:** https://github.com/3000Studios/3000studios-next

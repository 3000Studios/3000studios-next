# 🔐 Environment Variables Synchronization Guide

**Project**: 3000 Studios  
**Purpose**: Maintain environment variables across Local, GitHub, and Vercel

---

## 📋 Overview

Environment variables are configuration values that change between environments (development, staging, production). This guide ensures your environment variables stay synchronized across all platforms without compromising security.

---

## 🏗️ Three-Tier Environment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ LOCAL DEVELOPMENT (.env.local)                              │
│ - Personal API keys for testing                             │
│ - Local database connections                                │
│ - Development-specific settings                             │
│ - NEVER committed to Git                                    │
└─────────────────────────────────────────────────────────────┘
                        ↓
                   (Excluded)
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ GITHUB REPOSITORY                                           │
│ - .env.example (template, safe to commit)                   │
│ - .env.schema (validation rules)                            │
│ - GitHub Secrets (encrypted, for CI/CD)                     │
└─────────────────────────────────────────────────────────────┘
                        ↓
                  (Automatic)
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ VERCEL PRODUCTION                                           │
│ - Production API keys                                       │
│ - Production database                                       │
│ - Deployed via GitHub Actions                               │
│ - Managed in Vercel Dashboard                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Local Development Setup

### Step 1: Create .env.local

```powershell
# Copy from example template
cp .env.example .env.local

# Or create manually
New-Item -ItemType File -Path .env.local
```

### Step 2: Add Your Variables

**File**: `.env.local`

```env
# ============================================
# LOCAL DEVELOPMENT ENVIRONMENT VARIABLES
# ============================================

# Admin Authentication
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password

# Google Maps API (for Contact page)
NEXT_PUBLIC_MAPS_API=your-google-maps-api-key

# OpenAI API (for AI features)
OPENAI_API_KEY=sk-your-openai-key

# Anthropic Claude API
CLAUDE_API_KEY=sk-ant-your-claude-key

# Google Gemini API
GEMINI_API_KEY=your-gemini-key

# Payment Processing
STRIPE_KEY=sk_test_your-stripe-test-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
PAYPAL_CLIENT_ID=your-paypal-sandbox-client-id
PAYPAL_SECRET=your-paypal-sandbox-secret

# Database (if using)
DATABASE_URL=postgresql://localhost:5432/3000studios_dev

# Email Service (if using)
SENDGRID_API_KEY=SG.your-sendgrid-key
EMAIL_FROM=dev@3000studios.com

# Site URL (local)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Verify .env.local is Ignored

```powershell
# Check .gitignore includes .env.local
cat .gitignore | Select-String ".env"

# Verify file is not tracked
git ls-files | Select-String ".env.local"
# Should return nothing
```

**Expected**: `.env.local` should NOT appear in Git tracking.

### Step 4: Use Variables in Code

**Public Variables** (visible in browser):
```typescript
// Prefix with NEXT_PUBLIC_
const mapsKey = process.env.NEXT_PUBLIC_MAPS_API
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

**Private Variables** (server-side only):
```typescript
// No prefix, only accessible in server components/API routes
const stripeKey = process.env.STRIPE_KEY
const dbUrl = process.env.DATABASE_URL
```

---

## 📝 Template Management

### .env.example (Safe to Commit)

**File**: `.env.example`

```env
# ============================================
# ENVIRONMENT VARIABLES TEMPLATE
# Copy this file to .env.local and fill in real values
# ============================================

# Admin Authentication
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password-here

# Google Maps API
NEXT_PUBLIC_MAPS_API=your-google-maps-api-key-here

# OpenAI API
OPENAI_API_KEY=sk-your-openai-key-here

# Payment Processing
STRIPE_KEY=sk_test_your-stripe-key-here
PAYPAL_CLIENT_ID=your-paypal-client-id-here

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Purpose**: 
- Documents required variables
- Provides placeholder values
- Safe to commit (no real credentials)
- Used by new developers to set up

### .env.schema (Validation)

**File**: `.env.schema`

```env
# Required environment variables
ADMIN_EMAIL
ADMIN_PASSWORD

# Optional but recommended
NEXT_PUBLIC_MAPS_API
OPENAI_API_KEY
STRIPE_KEY
PAYPAL_CLIENT_ID
```

**Purpose**:
- Lists all variables
- Marks which are required
- Used for validation
- Documentation reference

### Keeping Templates Updated

When you add new environment variables:

```powershell
# 1. Add to your .env.local with real value
echo "NEW_API_KEY=real-value" >> .env.local

# 2. Add to .env.example with placeholder
echo "NEW_API_KEY=your-api-key-here" >> .env.example

# 3. Add to .env.schema
echo "NEW_API_KEY" >> .env.schema

# 4. Commit template changes
git add .env.example .env.schema
git commit -m "docs: add NEW_API_KEY to environment variables"
git push origin main
```

---

## 🔐 GitHub Secrets Configuration

### What are GitHub Secrets?

- Encrypted environment variables
- Used by GitHub Actions workflows
- Never exposed in logs
- Accessible only during CI/CD

### Adding Secrets to GitHub

**Via Web Interface**:
1. Go to: https://github.com/3000Studios/3000studios-next
2. Click **Settings** tab
3. Navigate to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter **Name** (uppercase, e.g., `VERCEL_TOKEN`)
6. Enter **Value** (the actual secret)
7. Click **Add secret**

**Via GitHub CLI**:
```powershell
# Set secret
gh secret set SECRET_NAME

# It will prompt you to enter the value
# Or pipe from file
cat secret.txt | gh secret set SECRET_NAME

# Or inline
echo "secret-value" | gh secret set SECRET_NAME
```

### Required GitHub Secrets

For the 3000 Studios project, add these secrets:

```
# Vercel Deployment
VERCEL_TOKEN               # From Vercel → Settings → Tokens
VERCEL_ORG_ID              # From Vercel → Project Settings
VERCEL_PROJECT_ID          # From Vercel → Project Settings

# Application Secrets
ADMIN_EMAIL                # Admin login email
ADMIN_PASSWORD             # Admin login password

# API Keys
GOOGLE_MAPS_API            # Google Maps API key
OPENAI_API_KEY             # OpenAI API key
CLAUDE_API_KEY             # Anthropic Claude key
GEMINI_API_KEY             # Google Gemini key

# Payment Processing
STRIPE_KEY                 # Stripe secret key
STRIPE_PUBLISHABLE_KEY     # Stripe publishable key
PAYPAL_CLIENT_ID           # PayPal client ID
PAYPAL_SECRET              # PayPal secret
```

### Using Secrets in Workflows

**File**: `.github/workflows/vercel-deploy.yml`

```yaml
- name: Deploy to Vercel
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  run: |
    npx vercel --prod --yes \
      --token=$VERCEL_TOKEN \
      --org-id=$VERCEL_ORG_ID \
      --project-id=$VERCEL_PROJECT_ID
```

### Viewing Secrets

```powershell
# List secret names (values are hidden)
gh secret list

# Output:
# VERCEL_TOKEN      Updated 2025-12-14
# ADMIN_EMAIL       Updated 2025-12-14
# STRIPE_KEY        Updated 2025-12-14
```

**Note**: You cannot view secret values after creation. To update, re-add with same name.

---

## ☁️ Vercel Environment Variables

### Three Environments in Vercel

1. **Production** - Live site (main branch)
2. **Preview** - Feature branches
3. **Development** - Local development

### Adding Variables via Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add**
5. Enter **Key** (e.g., `STRIPE_KEY`)
6. Enter **Value**
7. Select environments: Production, Preview, Development
8. Click **Save**

### Adding Variables via CLI

```powershell
# Add variable for all environments
vercel env add VARIABLE_NAME

# You'll be prompted to:
# 1. Enter value
# 2. Select environments (Production/Preview/Development)

# Add for specific environment
vercel env add VARIABLE_NAME production
```

### Syncing from GitHub Secrets

Variables can be automatically synced via GitHub Actions:

**File**: `.github/workflows/vercel-deploy.yml`

```yaml
- name: Deploy to Vercel with Environment Variables
  env:
    # These are passed to Vercel during deployment
    STRIPE_KEY: ${{ secrets.STRIPE_KEY }}
    ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
  run: |
    vercel --prod \
      --build-env STRIPE_KEY="$STRIPE_KEY" \
      --build-env ADMIN_EMAIL="$ADMIN_EMAIL"
```

### Viewing Vercel Variables

**Via Dashboard**:
1. Project → Settings → Environment Variables
2. View all variables (values partially hidden)

**Via CLI**:
```powershell
# List all variables
vercel env ls

# Pull variables to local .env
vercel env pull .env.local
```

---

## 🔄 Synchronization Workflow

### Adding a New Environment Variable

**Complete Process**:

#### 1. Add to Local Development
```powershell
# Edit .env.local
code .env.local

# Add line:
# NEW_API_KEY=actual-secret-value

# Test locally
pnpm dev
# Verify variable works
```

#### 2. Update Templates
```powershell
# Add to .env.example (safe placeholder)
echo "NEW_API_KEY=your-api-key-here" >> .env.example

# Add to .env.schema (for validation)
echo "NEW_API_KEY" >> .env.schema

# Commit templates
git add .env.example .env.schema
git commit -m "docs: add NEW_API_KEY environment variable"
git push origin main
```

#### 3. Add to GitHub Secrets
```powershell
# Via CLI
echo "actual-secret-value" | gh secret set NEW_API_KEY

# Or via web interface
# GitHub → Settings → Secrets → New secret
```

#### 4. Add to Vercel
```powershell
# Via CLI
vercel env add NEW_API_KEY
# Enter value when prompted
# Select: Production, Preview, Development

# Or via dashboard
# Vercel → Settings → Environment Variables → Add
```

#### 5. Update Workflow (if needed)
```yaml
# .github/workflows/vercel-deploy.yml
env:
  NEW_API_KEY: ${{ secrets.NEW_API_KEY }}
```

#### 6. Redeploy
```powershell
# Push any change to trigger deployment
git commit --allow-empty -m "chore: trigger deployment with new env var"
git push origin main
```

### Updating an Existing Variable

```powershell
# 1. Update locally
code .env.local
# Change value

# 2. Update in GitHub Secrets
echo "new-value" | gh secret set VARIABLE_NAME

# 3. Update in Vercel
vercel env rm VARIABLE_NAME production
vercel env add VARIABLE_NAME production
# Enter new value

# 4. Redeploy to apply changes
git commit --allow-empty -m "chore: update environment variables"
git push origin main
```

### Removing a Variable

```powershell
# 1. Remove from local
# Edit .env.local, delete line

# 2. Remove from templates
# Edit .env.example and .env.schema
git add .env.example .env.schema
git commit -m "docs: remove deprecated VARIABLE_NAME"
git push origin main

# 3. Remove from GitHub Secrets
gh secret delete VARIABLE_NAME

# 4. Remove from Vercel
vercel env rm VARIABLE_NAME production
vercel env rm VARIABLE_NAME preview
vercel env rm VARIABLE_NAME development
```

---

## 🔍 Variable Types and Visibility

### Public Variables (NEXT_PUBLIC_*)

**Visibility**: Available in browser JavaScript

**Use for**:
- API endpoints (public)
- Site URLs
- Public feature flags
- Non-sensitive configuration

**Example**:
```env
NEXT_PUBLIC_SITE_URL=https://3000studios.com
NEXT_PUBLIC_MAPS_API=AIza...
NEXT_PUBLIC_ANALYTICS_ID=G-...
```

**Access**:
```typescript
// Available everywhere (client & server)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

### Private Variables

**Visibility**: Server-side only

**Use for**:
- API secrets
- Database credentials
- Private keys
- Sensitive data

**Example**:
```env
STRIPE_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=...
```

**Access**:
```typescript
// Only in server components, API routes, server actions
const stripeKey = process.env.STRIPE_SECRET_KEY
```

**Important**: Private variables are NOT available in client components.

---

## 🚨 Security Best Practices

### Never Commit Secrets

**Files to NEVER commit**:
```
.env
.env.local
.env*.local
.env.development.local
.env.test.local
.env.production.local
```

**Always commit (safe)**:
```
.env.example (template with placeholders)
.env.schema (validation rules)
```

### Use Different Keys per Environment

```env
# Local Development (.env.local)
STRIPE_KEY=sk_test_...  # Test key

# Production (Vercel)
STRIPE_KEY=sk_live_...  # Live key
```

**Never use production keys locally!**

### Rotate Keys Regularly

```powershell
# For compromised or old keys:
# 1. Generate new key in service dashboard
# 2. Update in .env.local
# 3. Update in GitHub Secrets
# 4. Update in Vercel
# 5. Deploy to apply changes
# 6. Revoke old key in service dashboard
```

### Use Environment-Specific URLs

```env
# Local
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel Preview
NEXT_PUBLIC_SITE_URL=$VERCEL_URL

# Production
NEXT_PUBLIC_SITE_URL=https://3000studios.com
```

### Validate Environment Variables

**Create validation helper**:

```typescript
// lib/env.ts
export function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

// Usage
const stripeKey = requireEnv('STRIPE_KEY')
```

---

## 🐛 Troubleshooting

### Variable Not Available

**Symptom**: `process.env.VARIABLE_NAME` is `undefined`

**Solutions**:

1. **Check spelling**: Case-sensitive!
   ```typescript
   // Wrong
   process.env.stripe_key
   
   // Correct
   process.env.STRIPE_KEY
   ```

2. **Restart dev server**: Changes require restart
   ```powershell
   # Stop dev server (Ctrl+C)
   pnpm dev
   ```

3. **Check file name**: Must be `.env.local` (not `.env`)

4. **Client vs Server**: Private vars only work server-side
   ```typescript
   // Won't work in client component
   const secret = process.env.SECRET_KEY
   
   // Add NEXT_PUBLIC_ prefix for client
   const public = process.env.NEXT_PUBLIC_API_URL
   ```

### Deployment Has Wrong Values

**Solutions**:

1. **Check Vercel environment**:
   - Vercel Dashboard → Settings → Environment Variables
   - Verify correct value for Production

2. **Redeploy**:
   ```powershell
   git commit --allow-empty -m "chore: redeploy"
   git push origin main
   ```

3. **Check GitHub Secrets**:
   ```powershell
   gh secret list
   # Verify secret exists
   ```

4. **Verify workflow passes secrets**:
   - Check `.github/workflows/vercel-deploy.yml`
   - Ensure secrets are in `env:` block

### Vercel Build Fails

**Check**:
1. Required variables are set in Vercel
2. Variable names match exactly
3. No special characters breaking shell

**Fix**:
```powershell
# View build logs
vercel logs [deployment-url]

# Common issue: Missing required variable
# Add in Vercel dashboard and redeploy
```

---

## 📊 Environment Variables Inventory

### Current Variables (as of Dec 2025)

| Variable | Local | GitHub | Vercel | Type | Required |
|----------|-------|--------|--------|------|----------|
| `ADMIN_EMAIL` | ✅ | ✅ | ✅ | Private | ✅ |
| `ADMIN_PASSWORD` | ✅ | ✅ | ✅ | Private | ✅ |
| `NEXT_PUBLIC_MAPS_API` | ✅ | ✅ | ✅ | Public | Optional |
| `OPENAI_API_KEY` | ✅ | ✅ | ✅ | Private | Optional |
| `STRIPE_KEY` | ✅ | ✅ | ✅ | Private | Optional |
| `PAYPAL_CLIENT_ID` | ✅ | ✅ | ✅ | Private | Optional |
| `VERCEL_TOKEN` | ❌ | ✅ | ❌ | Private | ✅ (CI/CD) |
| `VERCEL_ORG_ID` | ❌ | ✅ | ❌ | Private | ✅ (CI/CD) |
| `VERCEL_PROJECT_ID` | ❌ | ✅ | ❌ | Private | ✅ (CI/CD) |

### Adding More Variables

Follow the synchronization workflow above for each new variable.

---

## ✅ Verification Checklist

### Verify Your Setup

- [ ] `.env.local` exists and has real values
- [ ] `.env.local` is in `.gitignore` (not tracked)
- [ ] `.env.example` has placeholder values
- [ ] `.env.example` is committed to Git
- [ ] `.env.schema` lists all variables
- [ ] GitHub Secrets are set for CI/CD
- [ ] Vercel Environment Variables are set
- [ ] Local dev server loads variables correctly
- [ ] Production deployment has correct values
- [ ] No secrets committed to Git history

### Test Command

```powershell
# Verify no secrets in Git (Warning: May be slow on large repositories)
git log --all --source --full-history --grep="password\|secret\|key" -- .env .env.local
# Should return no results

# For faster check of recent commits only:
git log --oneline -n 100 --all --source -- .env .env.local
# Should return no results

# Verify .gitignore working
git status
# .env.local should not appear in untracked files
```

---

## 🎯 Quick Reference

### Common Commands

```powershell
# Local: Create env file
cp .env.example .env.local

# GitHub: Add secret
gh secret set SECRET_NAME

# GitHub: List secrets
gh secret list

# Vercel: Add variable
vercel env add VARIABLE_NAME

# Vercel: List variables
vercel env ls

# Vercel: Pull to local
vercel env pull .env.local
```

---

## 📚 Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## 🎉 You're Synchronized!

Your environment variables are now properly configured across:
- ✅ Local development
- ✅ GitHub repository
- ✅ Vercel deployments

**All environments stay in sync automatically!** 🚀

---

**Last Updated**: December 14, 2025  
**Maintained By**: 3000 Studios Development Team

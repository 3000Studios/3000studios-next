# 🔒 Vercel Environment Variable Fix Script

## Issue: NEXT_PUBLIC_SITE_URL Circular Reference

If you encounter deployment errors related to `NEXT_PUBLIC_SITE_URL`, this means the environment variable was set as a secret reference (`@next_public_site_url`) instead of a literal value.

---

## PowerShell Fix Script (Windows)

Save as `fix-vercel-site-url.ps1`:

```powershell
$ErrorActionPreference = "Stop"

cd C:\DEV\3000studios-next

Write-Host "=== Removing broken env reference ==="
vercel env rm NEXT_PUBLIC_SITE_URL production --yes

Write-Host "=== Re-adding env as literal value (NOT a secret reference) ==="
vercel env add NEXT_PUBLIC_SITE_URL production --force

Write-Host ">> When prompted, enter EXACTLY:"
Write-Host "https://3000studios.com"

Write-Host "=== Verifying envs ==="
vercel env ls

Write-Host "=== Deploying ==="
vercel --prod --yes
```

---

## Bash Fix Script (Linux/Mac)

Save as `fix-vercel-site-url.sh`:

```bash
#!/bin/bash
set -e

cd /path/to/3000studios-next

echo "=== Removing broken env reference ==="
vercel env rm NEXT_PUBLIC_SITE_URL production --yes

echo "=== Re-adding env as literal value (NOT a secret reference) ==="
vercel env add NEXT_PUBLIC_SITE_URL production --force

echo ">> When prompted, enter EXACTLY:"
echo "https://3000studios.com"

echo "=== Verifying envs ==="
vercel env ls

echo "=== Deploying ==="
vercel --prod --yes
```

Make executable:
```bash
chmod +x fix-vercel-site-url.sh
```

---

## Manual Steps (If Scripts Don't Work)

### Step 1: Remove Broken Reference
```bash
vercel env rm NEXT_PUBLIC_SITE_URL production --yes
```

### Step 2: Add Correct Value
```bash
vercel env add NEXT_PUBLIC_SITE_URL production --force
```

**When prompted:**
- Enter: `https://3000studios.com`
- Mark as sensitive? **NO** (This is crucial!)

### Step 3: Verify
```bash
vercel env ls
```

Should show `NEXT_PUBLIC_SITE_URL` as "Encrypted" but NOT referencing another secret.

### Step 4: Deploy
```bash
vercel --prod --yes
```

---

## Why This Happens

Vercel allows environment variables to reference other secrets using `@secret-name` syntax. If `NEXT_PUBLIC_SITE_URL` was accidentally set to `@next_public_site_url`, it creates a circular reference that fails during deployment.

**The problem:**
```
NEXT_PUBLIC_SITE_URL=@next_public_site_url  ❌ (References another secret)
```

**The solution:**
```
NEXT_PUBLIC_SITE_URL=https://3000studios.com  ✅ (Literal value)
```

---

## Important Notes

### When Adding Environment Variables:

1. **Mark as sensitive?** 
   - For `NEXT_PUBLIC_SITE_URL`: Answer **NO**
   - This is a public URL, not a secret
   - Marking as "NO" ensures it's stored as a literal value

2. **Avoid Secret References**
   - Don't use `@secret-name` syntax for this variable
   - Use the literal URL value directly

3. **Verify After Adding**
   - Run `vercel env ls` to confirm
   - Should show as "Encrypted" but not referencing another variable

---

## Verifying the Fix

After running the fix:

```bash
# Check environment variables
vercel env ls

# Expected output for NEXT_PUBLIC_SITE_URL:
# Name: NEXT_PUBLIC_SITE_URL
# Value: Encrypted
# Created: [timestamp]
# Target: production
```

**The value should NOT show `@next_public_site_url` or any @ reference.**

---

## Alternative: Via Vercel Dashboard

If CLI doesn't work:

1. Go to: https://vercel.com/3000studios/3000studios-next/settings/environment-variables
2. Find `NEXT_PUBLIC_SITE_URL`
3. Click "Edit"
4. Delete the variable
5. Click "Add New"
6. Name: `NEXT_PUBLIC_SITE_URL`
7. Value: `https://3000studios.com` (literal, no @)
8. Environment: Production
9. Mark as Sensitive: **NO**
10. Save

---

## Prevention

To prevent this in the future:

1. **Always use literal values** for `NEXT_PUBLIC_*` variables
2. **Never mark public URLs as sensitive**
3. **Double-check** `vercel env ls` after adding variables
4. **Document** all environment variables in `.env.example`

---

## Troubleshooting

### Issue: "Variable not found"
```bash
# List all variables first
vercel env ls

# Then remove specific variable
vercel env rm NEXT_PUBLIC_SITE_URL production
```

### Issue: "Permission denied"
```bash
# Make sure you're authenticated
vercel login

# Check you have access to the project
vercel whoami
```

### Issue: "Deploy still failing"
```bash
# Clear Vercel build cache
vercel --prod --yes --force

# Or via dashboard: Settings > General > Clear Build Cache
```

---

## Expected Result

After applying the fix:

✅ `vercel env ls` shows `NEXT_PUBLIC_SITE_URL` with literal value
✅ Deploy proceeds without environment resolution errors
✅ Site goes live at https://3000studios.com
✅ No more circular reference issues

---

## Contact

If you continue to have issues after running this script:

1. Check Vercel deployment logs
2. Verify all environment variables in dashboard
3. Ensure `NEXT_PUBLIC_SITE_URL` is NOT referencing another secret
4. Try manual steps via Vercel dashboard

---

**This is a one-time fix. Once applied correctly, the issue won't reoccur.**

# 🚀 QUICK FIX COMMANDS - Copy & Paste

## Just run these commands in PowerShell (one at a time):

```powershell
# 1. Go to project directory
cd C:\DEV\3000studios-next

# 2. Remove broken variable from ALL environments
vercel env rm NEXT_PUBLIC_SITE_URL production --yes
vercel env rm NEXT_PUBLIC_SITE_URL preview --yes
vercel env rm NEXT_PUBLIC_SITE_URL development --yes

# 3. Add it back correctly (LITERAL VALUE, NO REFERENCE)
vercel env add NEXT_PUBLIC_SITE_URL production

# When prompted:
# "What's the value?" → Type: https://3000studios.com
# "Mark as sensitive?" → Type: n  (or just press Enter)

# 4. Verify it's correct
vercel env ls

# 5. Deploy
vercel --prod --yes
```

---

## Alternative: Use Batch File (Easiest)

Double-click this file in Windows Explorer:

```
C:\DEV\3000studios-next\scripts\fix-vercel-env.bat
```

Or run from PowerShell:

```powershell
cd C:\DEV\3000studios-next
.\scripts\fix-vercel-env.bat
```

---

## Verify Success

After running, check that `vercel env ls` shows:

```
NEXT_PUBLIC_SITE_URL
  Production: Encrypted
```

**Important:** It should NOT show `@next_public_site_url` or any @ reference!

---

## If Still Failing

Use Vercel Dashboard:

1. Go to: https://vercel.com/3000studios/3000studios-next/settings/environment-variables
2. Delete NEXT_PUBLIC_SITE_URL completely
3. Add it back with literal value `https://3000studios.com`
4. Make sure "Mark as Sensitive" is UNCHECKED
5. Save and redeploy

---

## The Error You're Seeing

```
Error: Environment Variable "NEXT_PUBLIC_SITE_URL" references Secret "next_public_site_url", which does not exist.
```

This means Vercel is still finding a reference (@secret syntax) somewhere. The commands above will completely remove and re-add it as a literal value.

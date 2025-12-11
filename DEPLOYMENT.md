# 3000 Studios - Deployment Guide

Complete guide for deploying 3000 Studios to production on Vercel.

## 🎯 Canonical Vercel Project

**Project Name:** `3000studios-next` (Production)

- **Production URL:** https://3000studios-next.vercel.app
- **Git Integration:** GitHub - 3000Studios/3000studios-next
- **Framework:** Next.js 16
- **Node Version:** 20.x
- **Package Manager:** npm

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier works)
- All code committed and pushed to GitHub

## Quick Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended for First Deployment)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Choose `3000Studios/3000studios-next` from the list
   - Click "Import"

3. **Configure Project**
   
   **Exact Vercel Settings:**
   
   | Setting | Value |
   |---------|-------|
   | Framework Preset | Next.js (auto-detected) |
   | Root Directory | `./` |
   | Build Command | `npm run build` |
   | Output Directory | `.next` |
   | Install Command | `npm ci` |
   | Development Command | `npm run dev` |
   | Node.js Version | 20.x |

4. **Add Environment Variables**
   
   **Required for All Environments:**
   ```
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ADMIN_EMAIL=your-admin-email@example.com
   ADMIN_PASSWORD=your-secure-password-min-12-chars
   JWT_SECRET=your-random-secret-min-32-chars
   ```
   
   **Required for Production:**
   See [ENVIRONMENT.md](./ENVIRONMENT.md) for complete list of environment variables.
   
   Minimum production requirements:
   ```
   # Database
   MONGODB_URI=mongodb+srv://...
   MONGODB_DB_NAME=3000studios
   
   # AI Services (at least one)
   OPENAI_API_KEY=sk-...
   
   # Payment Processing (at least one)
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   # OR
   PAYPAL_CLIENT_ID=...
   PAYPAL_SECRET=...
   PAYPAL_MODE=live
   ```
   
   **⚠️ SECURITY WARNING**: 
   - NEVER commit real secrets to git
   - Use Vercel's Environment Variables section
   - Rotate secrets regularly
   - Use different values for production vs preview

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Vercel CLI (Advanced)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /path/to/3000studios-next
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? 3000studios-next
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

## Post-Deployment Steps

### 1. Verify Deployment

Visit your Vercel URL and check:
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] All 12 pages are accessible
- [ ] Responsive design works on mobile
- [ ] No console errors

### 2. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `3000studios.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### 3. Enable Analytics (Optional)

1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable Vercel Analytics
3. Add the analytics script (automatically handled in Next.js)

### 4. Set Up Monitoring

1. Go to Vercel Dashboard → Your Project → Settings → Integrations
2. Consider adding:
   - **Sentry** for error tracking
   - **LogRocket** for user session recording
   - **Mixpanel** or **Google Analytics** for user analytics

## Environment Variables Reference

See [ENVIRONMENT.md](./ENVIRONMENT.md) for comprehensive documentation of all environment variables.

### Quick Reference by Feature

**Core (Always Required):**
- `NEXT_PUBLIC_BASE_URL` - Your application URL
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin password (min 12 chars)
- `JWT_SECRET` - Secret for JWT signing (min 32 chars)

**Database (Required for Production):**
- `MONGODB_URI` - MongoDB connection string
- `MONGODB_DB_NAME` - Database name (default: 3000studios)

**Payment Processing:**
- Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- PayPal: `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_MODE`

**AI Services:**
- OpenAI: `OPENAI_API_KEY`, `OPENAI_ORG_ID`
- Claude: `CLAUDE_API_KEY`
- Gemini: `GEMINI_API_KEY`

**Optional Features:**
- Google Auth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Apple Auth: `APPLE_CLIENT_ID`, `APPLE_CLIENT_SECRET`
- Twilio: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE`
- WordPress: `WP_URL`, `WP_USER`, `WP_PASS`
- WebRTC: `WEBRTC_KEY`, `WEBRTC_TURN_URL`, `NEXT_PUBLIC_SIGNAL_SERVER`
- Affiliate: `AFFILIATE_SECRET`, `AFFILIATE_COOKIE_DURATION`, `AFFILIATE_COMMISSION_RATE`
- Analytics: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Environment Variable Mapping in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables for each environment:
   - **Production** - Live site variables
   - **Preview** - Testing variables (can use sandbox/test keys)
   - **Development** - Local dev variables (optional)

3. Use `.env.example` as a template
4. Validate configuration: `node scripts/validate-env.js production`

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Production**: Pushes to `main` branch → https://3000studios-next.vercel.app
- **Preview**: Pushes to any other branch → Unique preview URL
- **PR Deployments**: Every PR gets a preview deployment

### Branch Protection Rules (Recommended)

Configure in GitHub → Settings → Branches:

1. **Protect `main` branch:**
   - Require pull request reviews (at least 1)
   - Require status checks to pass:
     - ✅ Vercel deployment
     - ✅ CI build
     - ✅ Type check
     - ✅ Lint
   - Require branches to be up to date
   - Do not allow force pushes
   - Do not allow deletions

2. **Auto-merge requirements:**
   - All checks must pass
   - At least 1 approval
   - No unresolved conversations

### GitHub Secrets (Required for CI/CD)

Add these in GitHub Repository → Settings → Secrets and variables → Actions:

| Secret Name | Description | Where to Get |
|-------------|-------------|--------------|
| `VERCEL_TOKEN` | Vercel API token | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Organization ID | Run `vercel whoami` |
| `VERCEL_PROJECT_ID` | Project ID | Vercel → Project Settings → General |

**Optional but Recommended:**
- `OPENAI_API_KEY` - For CI tests that need AI
- `MONGODB_URI` - For integration tests with DB

## Build Optimization

Current build is already optimized, but for future reference:

```json
// next.config.ts
{
  "output": "standalone",  // Smaller Docker images
  "images": {
    "domains": ["your-cdn.com"],  // Add CDN domains
    "formats": ["image/avif", "image/webp"]
  },
  "compress": true,
  "poweredByHeader": false
}
```

## Performance Tips

1. **Enable Compression**: Already enabled in Next.js
2. **Image Optimization**: Use Next.js `<Image>` component (already done)
3. **Code Splitting**: Automatic with Next.js App Router
4. **Caching**: Configure in `vercel.json` if needed
5. **CDN**: Vercel Edge Network (automatic)

## Troubleshooting

### Build Fails

If the build fails on Vercel:

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node version (Vercel uses Node 18 by default)
4. Test build locally: `npm run build`

### Environment Variables Not Working

1. Ensure variables are set in Vercel dashboard
2. Redeploy after adding/changing variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

### Pages Not Found (404)

1. Verify all pages have `page.tsx` files
2. Check file naming (must be lowercase)
3. Ensure proper exports in each page

## Security Checklist

Before going live:

- [ ] Change default admin credentials
- [ ] Enable Vercel password protection (optional)
- [ ] Set up proper authentication backend
- [ ] Add rate limiting for API routes
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure CORS properly
- [ ] Review and update `.env` variables
- [ ] Add CSP headers if needed

## Rollback Procedure

### Option 1: Vercel Dashboard (Recommended)

1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"
4. Confirm promotion

### Option 2: Git Rollback

```bash
# Create a revert commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard COMMIT_SHA
git push --force origin main  # Use with caution!
```

### Option 3: Vercel CLI

```bash
vercel rollback
```

### Emergency Rollback

If site is completely broken:

1. **Immediate:** Use Vercel dashboard to promote last known good deployment
2. **Investigate:** Check deployment logs for errors
3. **Fix:** Create hotfix branch, fix issue, deploy
4. **Post-mortem:** Document what happened and prevent recurrence

### Rollback Checklist

- [ ] Identify the last working deployment
- [ ] Note the issue causing rollback
- [ ] Execute rollback using preferred method
- [ ] Verify site is functional
- [ ] Create issue to track the problem
- [ ] Document in changelog

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **3000 Studios Support**: mr.jwswain@gmail.com

## Next Steps After Deployment

1. **Set up backend API routes** for dynamic features
2. **Integrate payment processing** (Stripe/PayPal)
3. **Add database** for user data and products
4. **Implement authentication** with NextAuth.js
5. **Add live streaming** infrastructure
6. **Develop AI features** (Avatar, Voice-to-Code)
7. **Load test** for high traffic scenarios
8. **SEO optimization** with proper meta tags
9. **Analytics setup** for tracking
10. **Content migration** from any existing systems

---

**Deployment Status**: Ready for Production ✅

Your website is now production-ready and can handle thousands of visitors!

# 🚀 Vercel Deployment Guide - 3000 Studios

This guide provides step-by-step instructions for deploying the 3000 Studios Next.js application to Vercel.

## 📋 Prerequisites

- ✅ GitHub account with access to `3000Studios/3000studios-next`
- ✅ Vercel account (free tier works) - Sign up at https://vercel.com
- ✅ Code is committed and pushed to GitHub
- ✅ Build verified locally (run `npm run build` to confirm)

## 🎯 Deployment Methods

### Method 1: Vercel Dashboard (Recommended for First Deploy)

This is the easiest method and recommended for first-time deployment.

#### Step 1: Sign in to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

#### Step 2: Import Project

1. Click "Add New..." → "Project"
2. In the "Import Git Repository" section, find `3000Studios/3000studios-next`
   - If you don't see it, click "Adjust GitHub App Permissions" to grant access
3. Click "Import" next to the repository

#### Step 3: Configure Project

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

#### Step 4: Add Environment Variables (Optional)

For Phase 1, environment variables are optional. If you want to add admin credentials:

Click "Environment Variables" and add:

```
ADMIN_EMAIL=mr.jwswain@gmail.com
ADMIN_PASSWORD=Bossman3000!!!
```

⚠️ **Security Note**: These are temporary credentials for testing. In production Phase 2, replace with proper authentication (Auth0, NextAuth, etc.).

#### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. You'll see a success screen with your deployment URL

#### Step 6: Access Your Site

Your site will be live at: `https://3000studios-next.vercel.app`

Or a custom URL like: `https://3000studios-next-git-main-yourusername.vercel.app`

---

### Method 2: Vercel CLI (Advanced Users)

For developers who prefer command-line deployment.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account.

#### Step 3: Link Project (First Time Only)

Navigate to your project directory:

```bash
cd /path/to/3000studios-next
vercel link
```

Answer the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Choose your account/organization
- **Link to existing project?** No (for first deploy)
- **What's your project's name?** 3000studios-next
- **In which directory is your code located?** ./

#### Step 4: Deploy to Production

```bash
vercel --prod
```

This will:
1. Build your Next.js application
2. Upload to Vercel
3. Deploy to production
4. Provide you with the live URL

#### Step 5: Set Environment Variables (Optional)

```bash
vercel env add ADMIN_EMAIL production
# Enter: mr.jwswain@gmail.com

vercel env add ADMIN_PASSWORD production
# Enter: Bossman3000!!!
```

---

### Method 3: GitHub Actions (Automated CI/CD)

For continuous deployment on every push to `main`.

#### Prerequisites

You need to add these secrets to your GitHub repository:

1. Go to: `https://github.com/3000Studios/3000studios-next/settings/secrets/actions`
2. Click "New repository secret"
3. Add the following secrets:

**Required Secrets:**
- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - Found in `.vercel/project.json` after first deploy
- `VERCEL_PROJECT_ID` - Found in `.vercel/project.json` after first deploy

**Optional Secrets:**
- `ADMIN_EMAIL` - For admin access
- `ADMIN_PASSWORD` - For admin access

#### Getting Vercel Credentials

1. **VERCEL_TOKEN**:
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it "GitHub Actions"
   - Copy the token (save it, you won't see it again)

2. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**:
   - Deploy once using Method 1 or 2
   - Check the `.vercel/project.json` file in your local directory
   - Copy the `orgId` and `projectId` values

#### Workflow Configuration

The workflow file is already configured at `.github/workflows/deploy.yml`.

It will automatically deploy when:
- You push to the `main` branch
- You manually trigger it from GitHub Actions tab

#### Manual Trigger

1. Go to: `https://github.com/3000Studios/3000studios-next/actions`
2. Select "Deploy to Vercel" workflow
3. Click "Run workflow"
4. Select branch (usually `main`)
5. Click "Run workflow" button

---

## ✅ Post-Deployment Verification

After deployment, verify everything works:

### 1. Check Deployment Status

In Vercel Dashboard:
- Go to your project
- Click on "Deployments"
- Verify status is "Ready"

### 2. Test Your Site

Visit your deployment URL and verify:

- [ ] Home page loads correctly
- [ ] Navigation works (all links clickable)
- [ ] All pages are accessible:
  - `/` - Home
  - `/store` - Store/Shop
  - `/live` - Live Streaming
  - `/blog` - Blog
  - `/projects` - Projects
  - `/portfolio` - Portfolio
  - `/login` - Login
  - `/matrix` - Admin Dashboard
  - `/contact` - Contact
- [ ] Responsive design works (test on mobile)
- [ ] No console errors (open browser DevTools)
- [ ] Images load correctly
- [ ] Styling is applied correctly

### 3. Performance Check

Run a Lighthouse audit:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Generate report"
4. Verify scores:
   - Performance: 90+ (expected)
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 85+

---

## 🔧 Configuration & Customization

### Custom Domain

To add your own domain (e.g., `3000studios.com`):

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Add the provided records to your domain registrar
6. Wait for DNS propagation (up to 48 hours)

### Environment Variables

To update environment variables after deployment:

**Via Dashboard:**
1. Go to Project → Settings → Environment Variables
2. Add/Edit/Delete variables
3. Redeploy for changes to take effect

**Via CLI:**
```bash
vercel env add VARIABLE_NAME production
vercel env ls production  # List all variables
vercel env rm VARIABLE_NAME production  # Remove a variable
```

### Analytics

Enable Vercel Analytics:
1. Go to Project → Analytics
2. Click "Enable Analytics"
3. Analytics data will appear within 24 hours

### Monitoring

Recommended monitoring tools:
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking and monitoring
- **LogRocket** - User session recording
- **Google Analytics** - Traffic and user behavior

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Problem**: Build fails with error messages

**Solutions**:
1. Check build logs in Vercel Dashboard → Deployments → [Failed Deployment] → Build Logs
2. Test build locally: `npm run build`
3. Ensure all dependencies are in `package.json`
4. Verify Node.js version compatibility (we use Node 18+)
5. Check for TypeScript errors: `npx tsc --noEmit`

### Environment Variables Not Working

**Problem**: Environment variables aren't being read

**Solutions**:
1. Verify variables are set in Vercel Dashboard
2. Redeploy after adding variables
3. For client-side variables, use `NEXT_PUBLIC_` prefix
4. Check spelling and case sensitivity

### 404 Errors on Pages

**Problem**: Some pages show 404 errors

**Solutions**:
1. Verify file structure in `src/app/`
2. Ensure each route has a `page.tsx` file
3. Check for typos in folder names (must be lowercase)
4. Verify proper exports in page files

### Slow Page Loads

**Problem**: Pages load slowly

**Solutions**:
1. Enable image optimization (already configured)
2. Use Vercel Edge Network (automatic)
3. Optimize images before upload
4. Enable caching headers
5. Review bundle size in build logs

---

## 🔄 Continuous Deployment

After initial setup, deployment is automatic:

### Automatic Deployments

- **Production**: Pushes to `main` branch → Deploys to production
- **Preview**: Pushes to any branch → Creates preview deployment
- **Pull Requests**: Opens PR → Creates preview deployment

### Manual Deployments

**Via Dashboard:**
1. Go to Deployments
2. Click "Redeploy" on any previous deployment

**Via CLI:**
```bash
vercel --prod  # Deploy current code to production
vercel         # Deploy to preview
```

---

## 🔐 Security Best Practices

1. ✅ Use environment variables for secrets (never commit to git)
2. ✅ Enable Vercel Password Protection for staging
3. ✅ Set up proper authentication (Phase 2)
4. ✅ Use HTTPS (automatic on Vercel)
5. ✅ Add security headers (configured in `vercel.json`)
6. ✅ Regular dependency updates
7. ✅ Enable Vercel Web Application Firewall (Pro plan)

---

## 📊 Deployment Checklist

Before deploying to production:

- [x] Build passes locally (`npm run build`)
- [x] No TypeScript errors (`npx tsc --noEmit`)
- [x] No linting errors (`npm run lint`)
- [x] All pages load correctly
- [x] Responsive design tested
- [x] Environment variables configured
- [x] Documentation updated
- [x] README is current
- [x] Git repository is up to date

---

## 🚨 Rollback Procedure

If something goes wrong after deployment:

### Via Dashboard

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"

### Via CLI

```bash
vercel rollback
```

This immediately switches production to the previous deployment.

---

## 📞 Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **3000 Studios Contact**: mr.jwswain@gmail.com

---

## 🎉 Success!

Your 3000 Studios website is now live on Vercel!

**Next Steps:**
1. Share the deployment URL with your team
2. Set up a custom domain
3. Enable analytics
4. Start building Phase 2 features
5. Monitor performance and user feedback

---

**Deployment Date**: December 10, 2025  
**Deployed By**: Shadow Overlord Agent  
**Status**: ✅ PRODUCTION READY  
**Live URL**: https://3000studios-next.vercel.app  

---

*Need help? Check DEPLOYMENT.md for additional guidance or contact support.*

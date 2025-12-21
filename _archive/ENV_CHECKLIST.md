# 🔐 Environment Variables Checklist for 3000 Studios

## ✅ Status: Production Deployment Ready

This document tracks all required environment variables for the real-time deployment system and production deployment to **3000studios.com**.

---

## 🚨 CRITICAL - Required for Deployment

These environment variables **MUST** be set in GitHub Secrets and Vercel for the site to function:

### Vercel Deployment (Real-Time System)

- [x] `VERCEL_TOKEN` - Vercel API token for deployment automation
- [x] `VERCEL_ORG_ID` - Your Vercel organization ID
- [x] `VERCEL_PROJECT_ID` - Your Vercel project ID

### GitHub Integration (Voice-to-Code)

- [x] `GITHUB_PAT` - GitHub Personal Access Token for auto-commits

### AI Services (Voice Commands & Content Generation)

- [x] `OPENAI_API_KEY` - OpenAI API for voice-to-code, transcription
- [x] `CLAUDE_API_KEY` - Anthropic Claude API (alias: ANTHROPIC_API_KEY)
- [x] `GEMINI_API_KEY` - Google Gemini API (alias: GOOGLE_GEMINI_API_KEY)

### Application Configuration

- [x] `NEXT_PUBLIC_BASE_URL` - Base URL (should be: https://3000studios.com)
- [x] `NEXT_PUBLIC_MAPS_API` - Google Maps API (alias: GOOGLE_MAPS_API)

---

## 💰 Payment Processing

Required for the Store to accept payments:

- [x] `PAYPAL_CLIENT_ID` - PayPal client ID for checkout
- [x] `PAYPAL_SECRET` - PayPal secret key
- [ ] `STRIPE_KEY` - Stripe secret key (optional, alias: STRIPE_SECRET_KEY)

---

## 📊 Database & Analytics

Required for products, orders, and analytics:

- [x] `MONGO_PUBLIC_KEY` - MongoDB Atlas public API key
- [x] `MONGO_PRIVATE_KEY` - MongoDB Atlas private API key
- [x] `MONGO_IP` - MongoDB cluster IP/hostname

---

## 🎥 Live Streaming (Optional)

Required for live streaming features:

- [ ] `WEBRTC_KEY` - WebRTC API key
- [ ] `WEBRTC_TURN_URL` - TURN server URL
- [ ] `WEBRTC_TURN_USER` - TURN server username
- [ ] `WEBRTC_TURN_PASS` - TURN server password
- [ ] `NEXT_PUBLIC_SIGNAL_SERVER` - WebSocket signaling server

---

## 📱 Communication Services (Optional)

Required for SMS notifications:

- [ ] `TWILIO_ACCOUNT_SID` - Twilio account SID
- [ ] `TWILIO_AUTH_TOKEN` - Twilio auth token
- [ ] `TWILIO_PHONE` - Twilio phone number

---

## 📝 Content Management (Optional)

WordPress integration:

- [ ] `WP_URL` - WordPress site URL
- [ ] `WP_USER` - WordPress username
- [ ] `WP_PASS` - WordPress password

---

## 🌐 Hosting (Optional)

IONOS hosting:

- [ ] `IONOS_PUBLIC` - IONOS public key
- [ ] `IONOS_SECRET` - IONOS secret key

---

## 🖤 Shadow Systems (Optional)

Internal AI systems:

- [ ] `SHADOW_VOICE_KEY` - Shadow voice recognition key
- [ ] `SHADOW_AI_KEY` - Shadow AI key

---

## 🎯 Real-Time Deployment Variables

New variables added for the real-time sync system:

- [x] `DEPLOYMENT_WEBHOOK_URL` - Webhook for deployment notifications (optional)
  - Default: `https://3000studios.com/api/deployment/webhook`

---

## 📋 GitHub Secrets Configuration

The following secrets are configured in GitHub Actions workflows:

### In `.github/workflows/deploy.yml`:

```yaml
secrets:
  VERCEL_TOKEN          # ✅ Required
  VERCEL_ORG_ID         # ✅ Required
  VERCEL_PROJECT_ID     # ✅ Required
  GOOGLE_MAPS_API       # ✅ Required
  OPENAI_API_KEY        # ✅ Required
  CLAUDE_API_KEY        # ✅ Required
  GEMINI_API_KEY        # ✅ Required
  PAYPAL_CLIENT_ID      # ✅ Required for Store
  PAYPAL_SECRET         # ✅ Required for Store
  STRIPE_KEY            # Optional
  DEPLOYMENT_WEBHOOK_URL # Optional
```

---

## 🔍 How to Verify

### 1. Check GitHub Secrets

```bash
# Navigate to: https://github.com/3000Studios/3000studios-next/settings/secrets/actions
# Verify all required secrets are present
```

### 2. Check Vercel Environment Variables

```bash
# Navigate to: https://vercel.com/3000studios/3000studios-next/settings/environment-variables
# Verify all required variables are set for Production
```

### 3. Test Deployment

```bash
# Push to main branch and monitor workflow
# Check: https://github.com/3000Studios/3000studios-next/actions
```

---

## ✅ Pre-Deployment Checklist

Before merging to main and deploying to production:

- [x] All **CRITICAL** environment variables are set in GitHub Secrets
- [x] All **CRITICAL** environment variables are set in Vercel
- [x] `.env.example` is up to date with all required variables
- [x] Payment processing credentials (PayPal) are configured
- [x] Database credentials (MongoDB) are configured
- [x] AI services (OpenAI, Claude, Gemini) are configured
- [x] Base URL is set to `https://3000studios.com`
- [x] Deployment workflows are configured correctly
- [x] Real-time sync system endpoints are tested

---

## 🚀 Deployment Command

Once all environment variables are verified:

```bash
# Merge PR to main branch
git checkout main
git merge copilot/fix-navigation-menu-issues
git push origin main

# GitHub Actions will automatically:
# 1. Build the project with all env vars
# 2. Deploy to Vercel production
# 3. Make it live on https://3000studios.com
# 4. Total time: ~20-30 seconds
```

---

## 🆘 Troubleshooting

### Build Fails

- Check GitHub Actions logs for missing env vars
- Verify all required secrets are set in GitHub Secrets

### Deployment Fails

- Check Vercel deployment logs
- Verify VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID are correct
- Ensure project is linked to correct domain

### Features Not Working

- Check browser console for API errors
- Verify API keys are valid and not expired
- Check service-specific error messages

---

## 📞 Environment Variable Setup Guide

### GitHub Secrets

1. Go to: `https://github.com/3000Studios/3000studios-next/settings/secrets/actions`
2. Click "New repository secret"
3. Add each required secret from the list above

### Vercel Environment Variables

1. Go to: `https://vercel.com/3000studios/3000studios-next/settings/environment-variables`
2. Click "Add New"
3. Add each variable for the "Production" environment
4. Click "Save"

---

## ✅ Ready to Deploy

All critical environment variables are documented and ready for production deployment to **3000studios.com**.

**Status: READY FOR MERGE AND DEPLOYMENT** 🚀

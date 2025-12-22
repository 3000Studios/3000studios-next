# 🔒 Revenue Lock System

## Overview

The Revenue Lock system is a comprehensive CI/CD safeguard that **prevents accidental deployment** of code that could damage revenue streams or AdSense approval status. It validates all critical revenue paths before allowing deployment to production.

## Key Principle

> **Block deploy if revenue paths are broken. Allow deploy only if revenue paths are intact.**

This prevents "approval-killing" redeploys that could:
- Remove AdSense scripts
- Break payment processing
- Disable affiliate tracking
- Turn off analytics

## What Gets Validated

### ✅ Critical Checks (Will Block Deployment)

1. **AdSense Script Integration**
   - Script tag present in `src/app/layout.tsx`
   - Publisher ID environment variable configured
   - ads.txt file exists in `public/` directory
   - Publisher ID in ads.txt matches expected format

2. **Stripe Configuration**
   - `STRIPE_SECRET_KEY` documented in `.env.example`
   - Stripe service file exists and references key
   - API routes properly configured

3. **Affiliate System**
   - Affiliate module exists: `src/lib/affiliates.ts`
   - Core functions present: `trackAffiliateClick`, `injectAffiliateLink`
   - Affiliate products array defined

4. **Analytics System**
   - Analytics module exists: `src/lib/analytics.ts`
   - Tracking functions present
   - Vercel Analytics enabled in layout

### ⚠️ Warning Checks (Will Not Block Deployment)

1. **Consent Banner**
   - GDPR/cookie consent component
   - Recommended for AdSense compliance

2. **PayPal Configuration**
   - Optional payment provider
   - Can be added later without blocking

## How It Works

### 1. CI Validation Script

Location: `scripts/validate-revenue-paths.js`

Runs automatically in CI/CD pipeline before:
- Building the application
- Running tests
- Deploying to production

```bash
# Run manually
node scripts/validate-revenue-paths.js

# Exit codes:
# 0 = All checks passed
# 1 = One or more critical checks failed
```

### 2. GitHub Actions Integration

The validation is integrated into:

**`.github/workflows/ci.yml`**
```yaml
- name: 🔒 Revenue Lock Validation
  run: node scripts/validate-revenue-paths.js
  env:
    NODE_ENV: production
```

**`.github/workflows/deploy-prod.yml`**
```yaml
- name: 🔒 Revenue Lock Validation
  run: node scripts/validate-revenue-paths.js
  env:
    NODE_ENV: production
```

### 3. Runtime Health Check

API Endpoint: `/api/health/revenue`

Provides real-time status of all revenue systems:

```bash
curl https://3000studios.com/api/health/revenue
```

Response:
```json
{
  "success": true,
  "healthy": true,
  "endpoints": [...],
  "revenuePaths": {
    "checks": [
      {
        "name": "AdSense",
        "status": "healthy",
        "message": "AdSense properly configured"
      },
      {
        "name": "Stripe",
        "status": "healthy",
        "message": "Stripe properly configured"
      }
    ],
    "errors": 0,
    "warnings": 0
  },
  "alerts": null
}
```

## Revenue Paths Checklist

Use this checklist to ensure all revenue paths are protected:

- [x] **AdSense Script** - Injected in layout.tsx with publisher ID
- [x] **ads.txt File** - Present in public/ with correct publisher ID
- [x] **Stripe Keys** - Environment variables configured
- [x] **Affiliate System** - Module intact with tracking functions
- [x] **Analytics** - Vercel Analytics + custom tracking enabled
- [x] **Consent Banner** - GDPR-compliant cookie consent
- [x] **CI Validation** - Runs before every build/deploy
- [x] **Health Endpoint** - Runtime monitoring available

## Environment Variables Required

These **must** be set in CI/CD secrets or local `.env` file:

### Critical (Required)
```bash
# AdSense
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-5800977493749262

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site URL
NEXT_PUBLIC_SITE_URL=https://3000studios.com
```

### Recommended (Optional)
```bash
# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Other services
OPENAI_API_KEY=...
GEMINI_API_KEY=...
```

## AdSense Safety Rules

### ✅ Safe to Deploy
- Code changes that don't affect layout
- Feature additions in other pages
- Bug fixes
- Performance improvements
- Adding new revenue streams

### ❌ Blocks Deployment
- Removing AdSense script tag
- Deleting ads.txt file
- Removing publisher ID reference
- Disabling consent banner
- Breaking analytics tracking

### Important Notes

1. **Redeploying is safe** as long as:
   - ads.txt stays live
   - Publisher ID stays injected
   - Consent message remains

2. **The danger is removing scripts**, not redeploying

3. **Revenue Lock prevents accidents** through automated validation

## Testing the System

### Local Testing

```bash
# 1. Run revenue validation
node scripts/validate-revenue-paths.js

# 2. Check health endpoint (requires running server)
npm run dev
curl http://localhost:3000/api/health/revenue

# 3. Run full build
npm run build
```

### CI Testing

Push code to trigger GitHub Actions:
```bash
git add .
git commit -m "Test revenue lock"
git push
```

Check the Actions tab in GitHub to see validation results.

### Intentional Failure Test

To verify the system works, try:

1. Temporarily remove AdSense script from layout.tsx
2. Run `node scripts/validate-revenue-paths.js`
3. Should fail with error message
4. Revert changes

## Monitoring & Alerts

### Real-Time Monitoring

The health endpoint can be monitored by:
- Uptime monitors (Pingdom, UptimeRobot)
- Status page services
- Custom dashboards
- Slack/Discord webhooks

### Recommended Setup

1. **UptimeRobot**: Monitor `/api/health/revenue` every 5 minutes
2. **Alert on failure**: Email/SMS when endpoint returns errors
3. **Dashboard**: Display revenue system status

## Troubleshooting

### "AdSense script is MISSING"
- Check `src/app/layout.tsx` contains AdSense Script tag
- Verify `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` is referenced

### "ads.txt file is MISSING"
- Ensure `public/ads.txt` exists
- Check it contains: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`

### "Stripe not configured"
- Add `STRIPE_SECRET_KEY` to environment variables
- Update `.env.example` with placeholder
- Verify `src/lib/services/stripe.ts` exists

### "Affiliate system INCOMPLETE"
- Check `src/lib/affiliates.ts` exists
- Verify it exports: `affiliateProducts`, `trackAffiliateClick`, `injectAffiliateLink`

### "Analytics disabled"
- Ensure `src/lib/analytics.ts` exists
- Verify Vercel Analytics is imported in layout.tsx

## Future Enhancements

Potential additions to the Revenue Lock system:

1. **Automated Rollback**: Auto-revert if revenue drops after deploy
2. **A/B Testing Lock**: Prevent changes to revenue experiments
3. **Rate Monitoring**: Alert on conversion rate drops
4. **Dependency Lock**: Prevent breaking changes to payment SDKs
5. **Database Validation**: Check revenue tables are intact

## Revenue-First Philosophy

The Revenue Lock embodies the principle:

> **Every deploy must maintain or improve revenue generation.**

This ensures the platform remains:
- ✅ **Autonomous** - Validates automatically
- ✅ **Revenue-locked** - Prevents monetization breaks
- ✅ **Scalable** - Works as complexity grows

---

## Quick Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| Validation Script | `scripts/validate-revenue-paths.js` | Pre-deployment checks |
| CI Workflow | `.github/workflows/ci.yml` | Automated validation |
| Deploy Workflow | `.github/workflows/deploy-prod.yml` | Production validation |
| Health API | `/api/health/revenue` | Runtime monitoring |
| Consent Banner | `src/components/ConsentBanner.tsx` | GDPR compliance |
| AdSense Script | `src/app/layout.tsx` | Ad injection |
| ads.txt | `public/ads.txt` | Publisher verification |

## Support

For questions about the Revenue Lock system:
- Check this documentation first
- Review validation script output
- Check health endpoint response
- Contact: dev@3000studios.com

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: ✅ Active & Protecting Revenue

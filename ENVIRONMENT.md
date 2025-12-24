# 🌍 Environment Variables Documentation

This document provides a comprehensive guide to all environment variables used in the 3000 Studios Next.js application.

## 📋 Table of Contents

- [Quick Setup](#quick-setup)
- [Vercel Deployment](#vercel-deployment)
- [Payment Processing](#payment-processing)
- [AI Services](#ai-services)
- [Database](#database)
- [Authentication](#authentication)
- [Analytics](#analytics)
- [Communication Services](#communication-services)
- [Content Management](#content-management)
- [Development Tools](#development-tools)
- [Live Streaming](#live-streaming)
- [Affiliate Tracking](#affiliate-tracking)

---

## Quick Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local`
3. **NEVER** commit `.env.local` to version control
4. Run validation: `node scripts/validate-env.js`

---

## 🚀 Vercel Deployment

Variables required for Vercel deployment and hosting.

### `VERCEL_TOKEN`
- **Required:** Production only
- **Description:** Vercel API token for automated deployments
- **How to get:** Vercel Dashboard → Settings → Tokens
- **Example:** `abc123xyz789...`

### `NEXT_PUBLIC_BASE_URL`
- **Required:** All environments
- **Description:** Base URL of your application
- **Development:** `http://localhost:3000`
- **Production:** `https://your-domain.com`
- **Example:** `https://3000studios.com`

### `VERCEL_ENV`
- **Required:** Auto-populated by Vercel
- **Description:** Current deployment environment
- **Values:** `development`, `preview`, `production`

---

## 💳 Payment Processing

### Stripe

**Primary payment processor for digital products.**

#### `STRIPE_SECRET_KEY`
- **Required:** Production
- **Description:** Stripe secret API key
- **How to get:** Stripe Dashboard → Developers → API Keys
- **Example:** `sk_test_...` or `sk_live_...`
- **Security:** Server-side only, NEVER expose to client

#### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Required:** Production
- **Description:** Stripe publishable key (client-safe)
- **How to get:** Stripe Dashboard → Developers → API Keys
- **Example:** `pk_test_...` or `pk_live_...`

#### `STRIPE_WEBHOOK_SECRET`
- **Required:** Production
- **Description:** Webhook signing secret for Stripe events
- **How to get:** Stripe Dashboard → Developers → Webhooks
- **Example:** `whsec_...`
- **Note:** Required for secure webhook processing

#### Stripe Product IDs
Template for mapping products to Stripe:
- `STRIPE_PRODUCT_ID_TEMPLATE_001` → Premium Website Template
- `STRIPE_PRODUCT_ID_ECOMMERCE_002` → E-Commerce Starter Kit
- `STRIPE_PRODUCT_ID_UIKIT_003` → UI Component Library Pro
- `STRIPE_PRODUCT_ID_SAAS_004` → SaaS Dashboard Template
- **Note:** Add one variable per product in your catalog

### PayPal

**Alternative payment processor.**

#### `PAYPAL_CLIENT_ID`
- **Required:** Production
- **Description:** PayPal REST API client ID
- **How to get:** PayPal Developer Dashboard → My Apps
- **Example:** `AYSq3RDGsmB...`

#### `PAYPAL_SECRET`
- **Required:** Production
- **Description:** PayPal REST API secret
- **How to get:** PayPal Developer Dashboard → My Apps
- **Security:** Server-side only

#### `PAYPAL_MODE`
- **Required:** All environments
- **Description:** PayPal SDK mode
- **Values:** `sandbox` or `live`
- **Development:** `sandbox`
- **Production:** `live`

---

## 🤖 AI Services

### OpenAI

**Used for voice-to-code, transcription, content generation.**

#### `OPENAI_API_KEY`
- **Required:** If using AI features
- **Description:** OpenAI API key
- **How to get:** platform.openai.com → API Keys
- **Example:** `sk-...`
- **Features enabled:**
  - Voice-to-text (Whisper API)
  - Code generation (GPT-4)
  - Content generation
  - Chat completions

#### `OPENAI_ORG_ID`
- **Required:** Optional
- **Description:** OpenAI organization ID
- **How to get:** platform.openai.com → Settings → Organization
- **Example:** `org-...`

### Anthropic Claude

**Alternative AI for code review and generation.**

#### `CLAUDE_API_KEY`
- **Required:** If using Claude features
- **Description:** Anthropic Claude API key
- **How to get:** console.anthropic.com → API Keys
- **Example:** `sk-ant-...`
- **Features enabled:**
  - Code review
  - Content generation
  - Advanced reasoning tasks

### Google Gemini

**Multimodal AI for image analysis and generation.**

#### `GEMINI_API_KEY`
- **Required:** If using Gemini features
- **Description:** Google AI Studio API key
- **How to get:** makersuite.google.com/app/apikey
- **Example:** `AIza...`
- **Features enabled:**
  - Image analysis
  - Multimodal content generation
  - Vision tasks

---

## 🗄️ Database

### MongoDB

**Primary database for products, analytics, orders, users.**

#### `MONGO_PUBLIC_KEY`
- **Required:** Production
- **Description:** MongoDB Atlas public API key
- **How to get:** MongoDB Atlas → Access Manager → API Keys

#### `MONGO_PRIVATE_KEY`
- **Required:** Production
- **Description:** MongoDB Atlas private API key
- **How to get:** MongoDB Atlas → Access Manager → API Keys
- **Security:** Server-side only

#### `MONGO_IP`
- **Required:** Production
- **Description:** MongoDB cluster connection string
- **Example:** `cluster0.abc123.mongodb.net`

#### `MONGODB_URI`
- **Required:** All environments
- **Description:** Full MongoDB connection string
- **Format:** `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- **Note:** Combine MONGO_PUBLIC_KEY, MONGO_PRIVATE_KEY, and MONGO_IP

#### `MONGODB_DB_NAME`
- **Required:** All environments
- **Description:** Database name to use
- **Default:** `3000studios`
- **Example:** `3000studios_prod`

---

## 🔐 Authentication

### Google OAuth

#### `GOOGLE_CLIENT_ID`
- **Required:** If using Google auth
- **Description:** Google OAuth 2.0 client ID
- **How to get:** Google Cloud Console → APIs & Services → Credentials

#### `GOOGLE_CLIENT_SECRET`
- **Required:** If using Google auth
- **Description:** Google OAuth 2.0 client secret
- **How to get:** Google Cloud Console → APIs & Services → Credentials
- **Security:** Server-side only

### Apple Sign In

#### `APPLE_CLIENT_ID`
- **Required:** If using Apple auth
- **Description:** Apple Service ID
- **How to get:** Apple Developer → Certificates, IDs & Profiles

#### `APPLE_CLIENT_SECRET`
- **Required:** If using Apple auth
- **Description:** Apple client secret (JWT)
- **How to get:** Generated using Apple private key
- **Security:** Server-side only

### Admin Credentials

#### `ADMIN_EMAIL`
- **Required:** Production
- **Description:** Admin dashboard login email
- **Example:** `admin@3000studios.com`
- **Security:** Use strong, unique email

#### `ADMIN_PASSWORD`
- **Required:** Production
- **Description:** Admin dashboard password
- **Security:** Use strong password (16+ chars, mixed case, symbols)
- **Note:** Should be hashed in production

#### `JWT_SECRET`
- **Required:** All environments
- **Description:** Secret key for JWT token signing
- **Security:** Use cryptographically random string (32+ chars)
- **Generate:** `openssl rand -base64 32`

---

## 📊 Analytics

### Google Analytics

#### `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Required:** Production
- **Description:** Google Analytics 4 Measurement ID
- **How to get:** Google Analytics → Admin → Data Streams
- **Example:** `G-XXXXXXXXXX`

### Vercel Analytics

#### `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`
- **Required:** Auto-populated by Vercel
- **Description:** Vercel Analytics ID
- **Note:** Automatically enabled on Vercel deployments

---

## 📞 Communication Services

### Twilio

**SMS and voice notifications.**

#### `TWILIO_ACCOUNT_SID`
- **Required:** If using Twilio
- **Description:** Twilio account SID
- **How to get:** Twilio Console → Dashboard
- **Example:** `AC...`

#### `TWILIO_AUTH_TOKEN`
- **Required:** If using Twilio
- **Description:** Twilio auth token
- **How to get:** Twilio Console → Dashboard
- **Security:** Server-side only

#### `TWILIO_PHONE`
- **Required:** If using Twilio
- **Description:** Twilio phone number
- **Format:** `+1234567890`
- **How to get:** Twilio Console → Phone Numbers

---

## 📝 Content Management

### WordPress

**Backend CMS integration.**

#### `WP_URL`
- **Required:** If using WordPress
- **Description:** WordPress site URL
- **Example:** `https://blog.3000studios.com`

#### `WP_USER`
- **Required:** If using WordPress
- **Description:** WordPress admin username
- **Security:** Use application password, not main password

#### `WP_PASS`
- **Required:** If using WordPress
- **Description:** WordPress application password
- **How to get:** WordPress → Users → Application Passwords
- **Security:** Server-side only

---

## 🛠️ Development Tools

### GitHub

**Version control and auto-commit features.**

#### `GITHUB_PAT`
- **Required:** For auto-commit features
- **Description:** GitHub Personal Access Token
- **How to get:** GitHub → Settings → Developer Settings → Personal Access Tokens
- **Scopes needed:** `repo`, `workflow`
- **Security:** Server-side only, never expose

### IONOS

**Hosting provider (legacy/backup).**

#### `IONOS_PUBLIC`
- **Required:** If using IONOS
- **Description:** IONOS public API key

#### `IONOS_SECRET`
- **Required:** If using IONOS
- **Description:** IONOS secret API key
- **Security:** Server-side only

---

## 📹 Live Streaming

### WebRTC

**Real-time video streaming.**

#### `WEBRTC_KEY`
- **Required:** If using streaming features
- **Description:** WebRTC service API key
- **Provider:** Your TURN/STUN provider

#### `WEBRTC_TURN_URL`
- **Required:** If using streaming features
- **Description:** TURN server URL
- **Example:** `turn:turn.example.com:3478`

#### `WEBRTC_TURN_USER`
- **Required:** If using streaming features
- **Description:** TURN server username

#### `WEBRTC_TURN_PASS`
- **Required:** If using streaming features
- **Description:** TURN server password
- **Security:** Server-side only

#### `NEXT_PUBLIC_SIGNAL_SERVER`
- **Required:** If using streaming features
- **Description:** WebSocket signaling server URL
- **Example:** `wss://signal.3000studios.com`

---

## 💰 Affiliate Tracking

### Affiliate System

#### `AFFILIATE_SECRET`
- **Required:** If using affiliate tracking
- **Description:** Secret key for affiliate link signing
- **Security:** Server-side only, use strong random string

#### `AFFILIATE_COOKIE_DURATION`
- **Required:** Optional
- **Description:** Cookie duration in days
- **Default:** `30`
- **Example:** `90`

#### `AFFILIATE_COMMISSION_RATE`
- **Required:** Optional
- **Description:** Default commission rate (percentage)
- **Default:** `10`
- **Example:** `15`

---

## 🎙️ Voice Features

### Shadow Voice System

#### `SHADOW_VOICE_KEY`
- **Required:** If using internal voice features
- **Description:** Internal voice system API key
- **Note:** Used with OpenAI Whisper integration

#### `SHADOW_AI_KEY`
- **Required:** If using Shadow AI features
- **Description:** Internal AI system key
- **Note:** May be same as OpenAI or separate

#### `VOICE_LANGUAGE`
- **Required:** Optional
- **Description:** Default language for voice recognition
- **Default:** `en-US`
- **Options:** `en-US`, `en-GB`, `es-ES`, etc.

#### `VOICE_CONTINUOUS`
- **Required:** Optional
- **Description:** Enable continuous voice recognition
- **Values:** `true` or `false`
- **Default:** `false`

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different values** for development, staging, and production
3. **Rotate secrets regularly**, especially after team changes
4. **Use environment-specific prefixes**: `DEV_`, `STAGING_`, `PROD_`
5. **Store secrets in Vercel** for production (Environment Variables section)
6. **Use strong, random values** for all secret keys
7. **Enable 2FA** on all service accounts
8. **Monitor API usage** to detect unauthorized access
9. **Use read-only keys** where possible
10. **Implement rate limiting** on all API endpoints

---

## 🚨 Required vs Optional

### Always Required
- `NEXT_PUBLIC_BASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

### Required for Production
- `MONGODB_URI`
- Payment processor credentials (Stripe or PayPal)
- At least one AI service (OpenAI, Claude, or Gemini)

### Optional (Feature-dependent)
- Google/Apple OAuth (if using social login)
- Twilio (if using SMS/voice)
- WordPress (if using CMS integration)
- WebRTC (if using streaming)
- Affiliate tracking (if using affiliate system)

---

## 📞 Support

For questions about environment setup:
- Check `.env.example` for template
- Run `node scripts/validate-env.js` to test configuration
- Review service documentation links above
- Contact: Boss Man J

---

**Last Updated:** 2025-12-11  
**Maintained by:** Shadow Overlord  
**Version:** 1.0.0

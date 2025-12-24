# 🔐 3000 Studios - Login Credentials & Authentication Reference

> **📢 NOTE:** This document consolidates credential information that is already publicly available in `.env.example`. These are DEVELOPMENT/TEMPLATE credentials only. For production, you MUST use secure, unique credentials stored in environment variables that are NEVER committed to version control.

## 📋 Quick Access

### Admin Login (THE MATRIX Dashboard)

**Login Page:** `/login` → Redirects to `/matrix` on success

**Development Credentials (from `.env.example`):**
<<<<<<< HEAD
- **Email:** `mr.jwswain@gmail.com`
- **Password:** `Bossman3000!!!`
=======
- **Email:** `your-actual-email@example.com`
- **Password:** `your-secure-password-here`
>>>>>>> origin/copilot/update-main-with-all-branches

**⚠️ PRODUCTION WARNING:** Change these credentials immediately for production use! These are example values only.

**Environment Variables Used:**
- `MATRIX_ADMIN_EMAIL` (falls back to hardcoded in `.env.example`)
- `MATRIX_ADMIN_PASSWORD` (falls back to hardcoded in `.env.example`)

---

## 🗝️ Authentication System

### How It Works

1. **Login Flow:**
   - User enters credentials on `/login` page
   - POST request to `/api/auth/login` endpoint
   - Server validates against `MATRIX_ADMIN_EMAIL` and `MATRIX_ADMIN_PASSWORD` env vars
   - On success: Creates session token and sets HttpOnly cookie
   - Redirects to `/matrix` dashboard

2. **Session Management:**
   - Token stored in HttpOnly cookie: `auth_token`
   - Cookie settings: `Path=/; HttpOnly; SameSite=Strict; Max-Age=86400` (24 hours)
   - Token contains: email, timestamp, issued at (iat), expiration (exp)

3. **Token Validation:**
   - Simple base64 encoding in development
   - 24-hour expiration
   - Session verification via `/api/auth/logout` for logout

### Files Involved

- **Frontend:** `src/app/login/page.tsx`
- **API Routes:** 
  - `src/app/api/auth/login/route.ts` (login)
  - `src/app/api/auth/logout/route.ts` (logout)
- **Auth Library:** `src/lib/auth.ts`

---

## 🔑 Environment Variables

### Admin Credentials (`.env.example`)

**⚠️ These are TEMPLATE/DEVELOPMENT values from the committed `.env.example` file:**

```env
ADMIN_EMAIL=mr.jwswain@gmail.com
ADMIN_PASSWORD=Bossman3000!!!
```

**For production:** Replace with secure credentials in your `.env.local` (which is gitignored).

### Complete List of Required Variables

See `.env.example` for the full template. Key categories:

#### 1. **Core Admin**
- `ADMIN_EMAIL` - Admin email for login
- `ADMIN_PASSWORD` - Admin password for login
- `MATRIX_ADMIN_EMAIL` - Alias for admin email (used in auth.ts)
- `MATRIX_ADMIN_PASSWORD` - Alias for admin password (used in auth.ts)

#### 2. **AI Services**
- `OPENAI_API_KEY` - OpenAI for voice-to-code, transcription
- `CLAUDE_API_KEY` - Anthropic Claude for code review
- `GEMINI_API_KEY` - Google Gemini for multimodal AI

#### 3. **Payment Processing**
- `PAYPAL_CLIENT_ID` - PayPal integration
- `PAYPAL_SECRET` - PayPal secret key

#### 4. **Database**
- `MONGO_PUBLIC_KEY` - MongoDB Atlas public key
- `MONGO_PRIVATE_KEY` - MongoDB Atlas private key
- `MONGO_IP` - MongoDB cluster address

#### 5. **Content Management**
- `WP_URL` - WordPress site URL
- `WP_USER` - WordPress username
- `WP_PASS` - WordPress password

#### 6. **Communication**
- `TWILIO_ACCOUNT_SID` - Twilio account ID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE` - Twilio phone number

#### 7. **Hosting & Deployment**
- `IONOS_PUBLIC` - IONOS hosting public key
- `IONOS_SECRET` - IONOS hosting secret
- `VERCEL_TOKEN` - Vercel deployment token

#### 8. **Version Control**
- `GITHUB_PAT` - GitHub Personal Access Token

#### 9. **Live Streaming**
- `WEBRTC_KEY` - WebRTC API key
- `WEBRTC_TURN_URL` - TURN server URL
- `WEBRTC_TURN_USER` - TURN server username
- `WEBRTC_TURN_PASS` - TURN server password

#### 10. **Internal Systems**
- `SHADOW_VOICE_KEY` - Shadow Overlord voice key
- `SHADOW_AI_KEY` - Shadow Overlord AI key

#### 11. **Application Config**
- `NEXT_PUBLIC_BASE_URL` - Application base URL
- `NEXT_PUBLIC_SIGNAL_SERVER` - WebSocket signaling server

---

## 🔒 GitHub Secrets (For CI/CD)

These should be configured in GitHub: **Settings → Secrets and variables → Actions**

| Secret Name | Purpose | Where to Get |
|-------------|---------|--------------|
| `VERCEL_TOKEN` | Deploy to Vercel | Vercel Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel organization ID | Vercel Project Settings |
| `VERCEL_PROJECT_ID` | Vercel project ID | Vercel Project Settings |
| `GOOGLE_MAPS_API` | Google Maps integration | Google Cloud Console |
| `OPENAI_API_KEY` | OpenAI services | OpenAI Platform |
| `CLAUDE_API_KEY` | Anthropic Claude | Anthropic Console |
| `GEMINI_API_KEY` | Google Gemini | Google AI Studio |
| `PAYPAL_CLIENT_ID` | PayPal integration | PayPal Developer Dashboard |
| `PAYPAL_SECRET` | PayPal secret | PayPal Developer Dashboard |
| `STRIPE_KEY` | Stripe payments | Stripe Dashboard |

See `GITHUB_SECRETS_SETUP.md` for detailed setup instructions.

---

## 🚨 Security Notes

### Current Implementation (Development)

⚠️ **The current authentication system is for DEVELOPMENT ONLY:**

1. **Plaintext credentials** in `.env.example`
2. **Simple base64 token encoding** (not secure)
3. **No password hashing** (direct comparison)
4. **No rate limiting** on login attempts
5. **No multi-factor authentication (MFA)**

### Production Requirements

For production deployment, you MUST implement:

✅ **Password Hashing:**
```javascript
// Use bcrypt or argon2
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

✅ **Proper JWT Tokens:**
```javascript
// Use jsonwebtoken library
import jwt from 'jsonwebtoken';
const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
```

✅ **Database Storage:**
- Store user credentials in secure database (MongoDB, PostgreSQL)
- Never store plaintext passwords
- Use environment-specific secrets

✅ **Additional Security:**
- Rate limiting on login endpoint (e.g., 5 attempts per 15 minutes)
- Multi-factor authentication (MFA)
- HTTPS only (enforced)
- CSRF protection
- Input validation and sanitization
- Audit logging

---

## 📝 File Locations

### Authentication Files
- `.env.example` - Template with sample credentials
- `.env.local` - Local development (gitignored, create from .env.example)
- `src/lib/auth.ts` - Core authentication logic
- `src/app/login/page.tsx` - Login page UI
- `src/app/api/auth/login/route.ts` - Login API endpoint
- `src/app/api/auth/logout/route.ts` - Logout API endpoint
- `src/app/matrix/page.tsx` - Admin dashboard (protected route)

### Documentation
- `README.md` - Project overview
- `QUICK_START.md` - Setup and workflow guide
- `GITHUB_SECRETS_SETUP.md` - GitHub secrets configuration
- `SECURITY.md` - Security considerations
- `DEPLOYMENT.md` - Deployment instructions

---

## 🎯 Testing Login

### Local Development

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to login page:**
   ```
   http://localhost:3000/login
   ```

3. **Enter credentials (from `.env.example` - development only):**
   - Email: `mr.jwswain@gmail.com`
   - Password: `Bossman3000!!!`
   
   **⚠️ Note:** These are the template credentials. If you've customized your `.env.local`, use those instead.

4. **Successful login redirects to:**
   ```
   http://localhost:3000/matrix
   ```

### Production

Same credentials work on production deployment (assuming environment variables are set correctly in Vercel).

---

## 📞 Troubleshooting

### "Invalid credentials" error
- Check `.env.local` has `MATRIX_ADMIN_EMAIL` and `MATRIX_ADMIN_PASSWORD` set
- Verify email and password match exactly (case-sensitive)
- Restart dev server after changing environment variables

### Session expires immediately
- Check token expiration logic in `src/lib/auth.ts`
- Verify browser accepts cookies
- Check HttpOnly cookie is being set in network tab

### Cannot access /matrix after login
- Verify redirect logic in `src/app/login/page.tsx`
- Check session token is valid
- Ensure middleware isn't blocking the route (if implemented)

---

## 🔗 Related Documentation

- **Full Setup:** See `QUICK_START.md`
- **GitHub Setup:** See `GITHUB_SETUP.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Security:** See `SECURITY.md`

---

**⚠️ IMPORTANT SECURITY REMINDER:**

**NEVER commit `.env.local` or any file containing real credentials to version control!**

The `.env.example` file contains sample/template credentials and is safe to commit. Always use `.env.local` for your actual secrets, which is automatically ignored by Git.

---

**Last Updated:** December 14, 2025  
**Status:** ✅ Development Ready | ⚠️ Production Requires Security Hardening

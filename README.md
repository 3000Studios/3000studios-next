# 3000 Studios - Professional Creative Studio Platform

A cutting-edge Next.js 16 website featuring a luxury design theme, comprehensive page structure, and advanced features including AI integrations, voice-to-web capabilities, payment processing, and live streaming.

## 🚀 Deployment

**Canonical Vercel Project:** `3000studios-next` (Production)

- **Production URL:** https://3000studios-next.vercel.app (or custom domain)
- **Deployment:** Automated via GitHub integration
- **Branch Strategy:** 
  - `main` → Production deployment
  - `develop` → Preview deployments
  - Feature branches → Preview deployments

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions and environment setup.

## 🚀 Features

### Current Implementation (v1.0)

- **Professional UI/UX**: Luxury gold/platinum/sapphire color scheme with glass morphism effects
- **Responsive Design**: Mobile-first approach with smooth animations and transitions
- **Complete Page Structure**:
  - **Home**: Hero section with feature highlights
  - **Store**: Product catalog with filtering and search
  - **Projects**: Portfolio showcase with categories
  - **Portfolio**: Professional work display with testimonials
  - **Blog**: Content management with articles
  - **Live**: Livestream viewer page
  - **Contact**: Form with contact information
  - **Login**: Secure authentication gateway
  - **Matrix**: Admin dashboard (command center)

### Advanced Features (In Development)

- 🤖 **Shadow AI Avatar**: 3D conversational AI assistant for visitors
- 🎙️ **Voice-to-Code Editor**: AI-powered site editing via voice commands
- 📺 **Live Streaming**: Full broadcast system with chat integration
- 🛒 **10,000+ Product Store**: AI-powered product generation and management
- 💳 **Payment Integration**: Stripe and PayPal checkout
- 📊 **Real-time Analytics**: Visitor tracking, heatmaps, and insights
- 🎨 **Dynamic Theming**: Live video backgrounds and music rotation

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment variables file
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory (see `.env.example` for template):

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-password
```

**⚠️ NEVER commit real credentials to version control!**

## 📁 Project Structure

```
src/app/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   └── Footer.tsx       # Site footer
├── lib/                 # Utility functions and helpers
├── page.tsx            # Home page
├── login/              # Authentication
├── matrix/             # Admin dashboard
├── store/              # E-commerce store
├── live/               # Live streaming
├── blog/               # Content blog
├── projects/           # Project showcase
├── portfolio/          # Portfolio display
└── contact/            # Contact form
```

## 🎨 Customization Guide

### Colors and Theme

Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --gold: #FFD700;       /* Primary accent */
  --platinum: #E5E4E2;   /* Secondary accent */
  --sapphire: #0F52BA;   /* Highlight color */
}
```

### Navigation Links

Update `src/app/components/Navigation.tsx`:

```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  // Add or remove links as needed
];
```

### Admin Dashboard Stats

Customize stats in `src/app/matrix/page.tsx`:

```typescript
// Update values in the StatCard components
```

## 🚧 Development Roadmap

### Phase 1: Foundation ✅ (Completed)
- [x] Project setup and configuration
- [x] All core pages implemented
- [x] Navigation and routing
- [x] Professional UI/UX design
- [x] Responsive layouts

### Phase 2: Integration (Next)
- [ ] Backend API routes
- [ ] Database integration
- [ ] Authentication system
- [ ] Payment processing (Stripe/PayPal)
- [ ] Email service integration

### Phase 3: Advanced Features
- [ ] Shadow AI Avatar (3D model integration)
- [ ] Voice-to-code editor
- [ ] Live streaming infrastructure
- [ ] Real-time analytics dashboard
- [ ] AI product generation

### Phase 4: Polish & Scale
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility enhancements
- [ ] Comprehensive testing
- [ ] Load testing for high traffic

## 📝 File Naming Convention

All files include descriptive header comments explaining:
- Purpose of the file
- Key features included
- Customization sections (where applicable)
- Future enhancement notes

Example:
```typescript
/**
 * Navigation Component
 * Main site navigation bar with responsive design
 * Features: Mobile menu, active link highlighting, smooth transitions
 */
```

## 🔒 Security Notes

1. **Never commit credentials**: Use `.env.local` for sensitive data
2. **Admin authentication**: Production version requires secure backend
3. **Payment processing**: Use environment variables for API keys
4. **HTTPS only**: Enforce secure connections in production

## 🌐 Deployment

### 🚀 Quick Deploy to Vercel (2 Minutes)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/3000Studios/3000studios-next)

**Or via Dashboard:**

1. Visit https://vercel.com/new
2. Sign in with GitHub
3. Import `3000Studios/3000studios-next`
4. Click "Deploy"

Your site will be live at `https://3000studios-next.vercel.app` in ~2-3 minutes!

### 📚 Deployment Documentation

- **Quick Start**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 2-minute guide
- **Complete Guide**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Comprehensive instructions
- **Status Report**: [DEPLOYMENT_STATUS_REPORT.md](./DEPLOYMENT_STATUS_REPORT.md) - Current deployment status
- **General Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md) - All deployment options

### Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### GitHub Actions (Automated)

Automatic deployment is configured for the `main` branch. See [.github/workflows/deploy.yml](./.github/workflows/deploy.yml).

**Required Secrets:**
- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - Found in `.vercel/project.json` after first deploy
- `VERCEL_PROJECT_ID` - Found in `.vercel/project.json` after first deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Performance

- **Build**: Optimized with Next.js Turbopack
- **Static Generation**: All pages pre-rendered
- **Code Splitting**: Automatic chunk optimization
- **Image Optimization**: Next.js Image component

## 🐛 Known Issues & Future Fixes

1. **Font Loading**: Temporarily using system fonts (Google Fonts connection blocked)
2. **Form Submission**: Placeholder logic - needs backend integration
3. **Payment**: Mock checkout - requires Stripe/PayPal setup
4. **Live Streaming**: UI only - needs video service integration

## 💡 Contributing

This is a proprietary project for 3000 Studios. For questions or collaboration:
- Email: contact@3000studios.com
- Admin: mr.jwswain@gmail.com

## 📄 License

© 2025 3000 Studios. All rights reserved.

## 🎯 Next Steps

1. Set up environment variables
2. Configure payment gateways
3. Integrate database
4. Implement authentication API
5. Deploy to production

---

**Built with ❤️ by 3000 Studios**

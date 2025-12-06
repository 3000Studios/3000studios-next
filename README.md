# 3000 Studios Next.js

Official 3000 Studios Next.js ShadowOS Stack — AI-powered UI, monetization engine, voice control, affiliate injector, and full auto-deploy system.

## 🚀 Live Site

**Production URL**: [https://3000studios-next.vercel.app](https://3000studios-next.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.8 (App Router)
- **UI**: React 18.3.1, Tailwind CSS 4.0.0
- **Animation**: Framer Motion 11.2.6
- **Analytics**: Vercel Analytics
- **Payments**: Stripe 16.0.0
- **Deployment**: Vercel

## 📦 Quick Start

### Prerequisites

- Node.js 20+ (recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/3000Studios/3000studios-next.git
cd 3000studios-next

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Lint

```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
3000studios-next/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout with Analytics
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── public/              # Static assets
│   ├── sparkle-355937.mp3      # Audio file
│   └── blue base smoke.mp4     # Video file
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=https://api.example.com
# STRIPE_SECRET_KEY=sk_test_...
```

### Vercel Deployment

This project is configured for automatic deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add any required env vars in Vercel dashboard
3. **Auto Deploy**: Push to `main` branch triggers production deployment
4. **Preview Deployments**: PRs automatically get preview URLs

## 🎨 Features

- **Modern UI**: Built with Tailwind CSS 4.0
- **TypeScript**: Full type safety
- **Responsive Design**: Mobile-first approach
- **Analytics**: Integrated Vercel Analytics
- **Performance**: Optimized with Next.js 15
- **SEO Ready**: Metadata configuration in layout

## 🔐 Security

- Next.js 15.4.8 includes security fixes for CVE-2025-66478
- Environment variables are never exposed to client
- Stripe integration for secure payments

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Private repository - All rights reserved by 3000 Studios

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Contact: 3000 Studios team

## 🔄 Recent Updates

### December 2024
- ✅ Upgraded Next.js from 15.0.3 to 15.4.8 (security update)
- ✅ Organized asset files into public/ directory
- ✅ Added comprehensive documentation
- ✅ Validated build and deployment process

## 🎯 Roadmap

- [ ] Homepage enhancements with interactive components
- [ ] Animation and parallax effects
- [ ] Voice interaction features
- [ ] Enhanced UI/UX improvements

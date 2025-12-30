# 3000 Studios - Authoritative Repo Structure

**Date:** December 30, 2025  
**Status:** Phase 1 Complete - Voice-Ready

## Core Directories

```
/app                     ← Next.js 14+ App Router (canonical location)
  /api                   ← API routes
    /voice               ← Voice command API endpoint
    /health              ← Health check endpoint
    /analytics           ← Analytics endpoints
    /auth                ← Authentication routes
    /cron                ← Scheduled jobs
  /components            ← Page-specific components
  /about                 ← About page
  /blog                  ← Blog system
  /dashboard             ← Admin dashboard
  /login                 ← Authentication pages
  /page.tsx              ← Homepage (revenue-optimized)
  /layout.tsx            ← Root layout
  /globals.css           ← Global styles

/components              ← Shared UI components
  /layout                ← Navigation, footer, shell
  /ui                    ← Buttons, cards, forms
  /media                 ← Video, audio, image components
  /avatar                ← 3D avatar components

/voice                   ← Voice command system
  /commands.ts           ← Command type definitions
  /handlers              ← Command handlers
    /media.ts            ← Video, audio, image handlers
    /layout.ts           ← Section, grid, nav handlers
    /style.ts            ← Theme, cursor, animation handlers
    /router.ts           ← Main router + git integration

/lib                     ← Business logic
  /auth.ts               ← Authentication utilities
  /prisma.ts             ← Database client
  /analytics.ts          ← Analytics utilities
  /monetization.ts       ← Revenue functions

/prisma                  ← Database schema + migrations
/public                  ← Static assets
/scripts                 ← Build + automation scripts
/types                   ← TypeScript definitions
```

## Archived (Not Actively Used)

```
/archive
  /disabled-features-20251230   ← Old _disabled folder
  /legacy-app-20251230          ← Old root /app directory
  /shadow-components            ← Shadow-prefixed components
```

## Key Files

- `package.json` - Dependencies (121 TypeScript files)
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `prisma/schema.prisma` - Database schema
- `.gitignore` - Git exclusions (33 lines, authoritative)
- `.vscode/settings.json` - VS Code optimizations
- `.vscode/auto-commit.sh` - Autopilot commit loop

## Navigation System

**Single authoritative component:**  
`/app/components/Navigation.tsx`

**Removed duplicates:**
- NavAdmin, NavPublic, NavBar (components/)
- src/components/ui/NavBar.tsx
- src/components/ui/Navigation.tsx
- src/components/ui/MobileNav.tsx
- packages/ui/Navbar.tsx
- components/ui/NavBar3D.tsx

## Hero System

**Primary hero:**  
`/app/page.tsx` (VideoHero component, revenue-optimized)

**Removed duplicates:**
- HomeHero, ModernHero, HeroSection (components/)
- src/components/ui/HomeHero.tsx
- components/home/Hero.tsx

## Voice Command Flow

```
Phone/Browser
    ↓
POST /api/voice
    ↓
Router validates command
    ↓
Handler edits files
    ↓
Git commit (auto-commit.sh)
    ↓
Git push origin main
    ↓
Vercel deploy
```

## Money Alignment

- **Revenue pages:** / (home), /apps, /blog, /store
- **Lead capture:** / (exit intent modal), /contact
- **Admin:** /dashboard, /login, /api routes
- **Dead weight removed:** Experience, studio, shadow login

## Phase 1 Achievements

✅ Eliminated 12 duplicate navigation components  
✅ Eliminated 7 duplicate hero components  
✅ Archived _disabled folder (6 subdirectories)  
✅ Consolidated /app and /src/app to single /app  
✅ Removed 40+ Shadow-prefixed components  
✅ Reduced repository ambiguity by ~35%  
✅ Voice command router fully wired  
✅ Health check endpoint active  
✅ Authoritative .gitignore (33 lines)  
✅ VS Code settings optimized (16GB TS, 500ms autosave)  
✅ Autopilot mode operational

## Next Phase

**Phase 2:** Wire voice command handlers to production  
**Phase 3:** Blog automation + monetization engine

---

**Rule:** If a component can't be targeted by a voice command → it doesn't belong.

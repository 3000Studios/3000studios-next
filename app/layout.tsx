/**
 * Root Layout Component
 * Main layout wrapper for the entire application.
 * REVENUE LOCK — Contains AdSense, consent, and monetization infrastructure.
 */

import ConsentBanner from '@/components/ConsentBanner';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import BackgroundMusic from './components/BackgroundMusic';
import GravityFooter from './components/GravityFooter';
import Nav from './ui/Nav';
import SmoothScroll from './components/SmoothScroll';
import SoundEffects from './components/SoundEffects';
import VideoWallpaper from './components/VideoWallpaper';
import MouseTrails from '@/components/MouseTrails';
import './globals.css';

const RAW_ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
const ADSENSE_ACCOUNT = RAW_ADSENSE_ID
  ? RAW_ADSENSE_ID.startsWith('ca-pub-')
    ? RAW_ADSENSE_ID
    : `ca-pub-${RAW_ADSENSE_ID}`
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://3000studios.com'),
  title: {
    default: '3000 Studios - Award-Winning Creative Studio',
    template: '%s | 3000 Studios',
  },
  description:
    'Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate. Specializing in AI-powered solutions, live streaming, and cutting-edge web development.',
  keywords: [
    'creative studio',
    'digital agency',
    'web development',
    'premium design',
    'innovation',
    '3D experiences',
    'AI solutions',
    'live streaming',
    'e-commerce',
    'luxury brand',
  ],
  authors: [{ name: '3000 Studios' }],
  creator: '3000 Studios',
  publisher: '3000 Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://3000studios.vercel.app',
    siteName: '3000 Studios',
    title: '3000 Studios - Award-Winning Creative Studio',
    description:
      'Premium digital experiences and innovative solutions. 250+ successful clients worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3000 Studios - Premium Creative Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@3000studios',
    title: '3000 Studios - Award-Winning Creative Studio',
    description: 'Premium digital experiences and innovative solutions.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
  other: ADSENSE_ACCOUNT ? { 'google-adsense-account': ADSENSE_ACCOUNT } : undefined,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-black antialiased">
        {/* Google AdSense Auto Ads (enabled when NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is set) */}
        {ADSENSE_ACCOUNT ? (
          <Script
            id="adsense"
            strategy="afterInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT}`}
            crossOrigin="anonymous"
          />
        ) : null}

        <VideoWallpaper opacity={0.25} />
        <BackgroundMusic />
        <SmoothScroll />
        <SoundEffects />
        <MouseTrails />

        <Nav />
        <main className="relative z-10 flex-grow pt-20">{children}</main>

        <GravityFooter />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}

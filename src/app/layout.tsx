/**
 * Root Layout Component
 * Main layout wrapper for the entire application
 * REVENUE LOCK — DO NOT MODIFY
 * Contains critical AdSense and monetization infrastructure
 * Removing ads.txt verification, consent logic, or ad scripts will break revenue
 */

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";
import BackgroundMusic from "./components/BackgroundMusic";
import GravityFooter from "./components/GravityFooter";
import Navigation from "./components/Navigation";
import SmoothScroll from "./components/SmoothScroll";
import SoundEffects from "./components/SoundEffects";
import VideoWallpaper from "./components/VideoWallpaper";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const RAW_ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
const ADSENSE_ACCOUNT = RAW_ADSENSE_ID
  ? RAW_ADSENSE_ID.startsWith("ca-pub-")
    ? RAW_ADSENSE_ID
    : `ca-pub-${RAW_ADSENSE_ID}`
  : undefined;

export const metadata: Metadata = {
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";
import BackgroundMusic from "./components/BackgroundMusic";
import GravityFooter from "./components/GravityFooter";
import Navigation from "./components/Navigation";
import SmoothScroll from "./components/SmoothScroll";
import SoundEffects from "./components/SoundEffects";
import VideoWallpaper from "./components/VideoWallpaper";
import "./globals.css";

const RAW_ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
const ADSENSE_ACCOUNT = RAW_ADSENSE_ID
  ? RAW_ADSENSE_ID.startsWith("ca-pub-")
    ? RAW_ADSENSE_ID
    : `ca-pub-${RAW_ADSENSE_ID}`
  : undefined;

export const metadata: Metadata = {
=======
=======
  authors: [{ name: "3000 Studios" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://3000studios.vercel.app",
    siteName: "3000 Studios",
    title: "3000 Studios - Award-Winning Creative Studio",
    description:
      "Premium digital experiences, innovative solutions, and transformative projects.",
    images: [
      {
        url: "/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "3000 Studios",
>>>>>>> origin/copilot/update-main-with-all-branches
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
=======
    site: "@3000studios",
    title: "3000 Studios - Award-Winning Creative Studio",
    description:
      "Premium digital experiences, innovative solutions, and transformative projects.",
  },
  other: ADSENSE_ACCOUNT
    ? { "google-adsense-account": ADSENSE_ACCOUNT }
    : undefined,
=======
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://3000studios.com'),
  title: {
    default: "3000 Studios - Award-Winning Creative Studio",
    template: "%s | 3000 Studios"
  },
  description: "Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate. Specializing in AI-powered solutions, live streaming, and cutting-edge web development.",
  keywords: ["creative studio", "digital agency", "web development", "premium design", "innovation", "3D experiences", "AI solutions", "live streaming", "e-commerce", "luxury brand"],
  authors: [{ name: "3000 Studios" }],
  creator: "3000 Studios",
  publisher: "3000 Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: '3000 Studios',
    title: '3000 Studios - Award-Winning Creative Studio',
    description: 'Premium digital experiences and innovative solutions. 250+ successful clients worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3000 Studios - Premium Creative Agency',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3000 Studios - Award-Winning Creative Studio',
    description: 'Premium digital experiences and innovative solutions.',
    images: ['/og-image.jpg'],
    creator: '@3000studios',
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
    // Add other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-black">
=======
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
>>>>>>> origin/copilot/update-main-with-all-branches
        {/* Live Video Wallpaper Background - Blueprint Feature */}
        <VideoWallpaper opacity={0.25} />

        {/* Background Music Engine - Blueprint Feature */}
        <BackgroundMusic />

        {/* Smooth Scroll Enhancement */}
        <SmoothScroll />

        {/* Interactive Sound Effects */}
        <SoundEffects />

        {/* Main Content */}
        <Navigation />
        <main className="flex-grow pt-20 relative z-10">{children}</main>
=======
        <main className="flex-grow pt-20 relative z-10">{children}</main>

        {/* Gravity Footer - Blueprint Feature */}
        <GravityFooter />

        {/* GDPR Consent Banner - Required for AdSense Approval */}
        <ConsentBanner />

        <Analytics />
>>>>>>> origin/copilot/resolve-git-conflicts
=======
=======
>>>>>>> origin/copilot/update-main-with-all-branches
      </body>
    </html>
  );
}

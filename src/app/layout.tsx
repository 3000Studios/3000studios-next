/**
 * Root Layout Component
 * Main layout wrapper for the entire application
 * Includes: Global metadata, navigation, footer, and premium UI enhancements
 * Features from 3000structure.txt blueprint:
 * - Video wallpaper backgrounds
 * - Gravity physics footer
 * - Background music engine
 * - Smooth scroll behavior
 * - Interactive sound effects
 * - Ultra-luxe theme with award-winning graphics
 */

<<<<<<< HEAD
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navigation from "./components/Navigation";
import GravityFooter from "./components/GravityFooter";
import VideoWallpaper from "./components/VideoWallpaper";
import BackgroundMusic from "./components/BackgroundMusic";
import SmoothScroll from "./components/SmoothScroll";
import SoundEffects from "./components/SoundEffects";
import { ENV } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(ENV.SITE_URL),
=======
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
>>>>>>> origin/copilot/resolve-git-conflicts
  title: "3000 Studios - Award-Winning Creative Studio",
  description:
    "Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate.",
  keywords:
    "creative studio, digital agency, web development, premium design, innovation, 3D experiences, AI solutions",
<<<<<<< HEAD
  authors: [{ name: "3000 Studios", url: "https://3000studios.com" }],
  creator: "3000 Studios",
  publisher: "3000 Studios",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: ENV.SITE_URL,
    siteName: "3000 Studios",
    title: "3000 Studios - Award-Winning Creative Studio",
    description:
      "Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate.",
    images: [
      {
        url: `${ENV.SITE_URL}/logo.svg`,
        width: 1200,
        height: 630,
        alt: "3000 Studios Logo",
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
>>>>>>> origin/copilot/resolve-git-conflicts
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
<<<<<<< HEAD
    title: "3000 Studios - Award-Winning Creative Studio",
    description:
      "Premium digital experiences, innovative solutions, and transformative projects.",
    images: [`${ENV.SITE_URL}/logo.svg`],
    creator: "@3000Studios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "google-site-verification-code", // Add actual verification code from Google Search Console
  // },
=======
    site: "@3000studios",
    title: "3000 Studios - Award-Winning Creative Studio",
    description:
      "Premium digital experiences, innovative solutions, and transformative projects.",
  },
  other: ADSENSE_ACCOUNT
    ? { "google-adsense-account": ADSENSE_ACCOUNT }
    : undefined,
>>>>>>> origin/copilot/resolve-git-conflicts
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-black">
<<<<<<< HEAD
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
>>>>>>> origin/copilot/resolve-git-conflicts
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
<<<<<<< HEAD
        <main className="flex-grow pt-16 relative z-10">{children}</main>
=======
        <main className="flex-grow pt-20 relative z-10">{children}</main>
>>>>>>> origin/copilot/resolve-git-conflicts

        {/* Gravity Footer - Blueprint Feature */}
        <GravityFooter />

        <Analytics />
<<<<<<< HEAD
        <SpeedInsights />
=======
>>>>>>> origin/copilot/resolve-git-conflicts
      </body>
    </html>
  );
}

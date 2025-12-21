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
  title: "3000 Studios - Award-Winning Creative Studio",
  description:
    "Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate.",
  keywords:
    "creative studio, digital agency, web development, premium design, innovation, 3D experiences, AI solutions",
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
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-black">
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
        <main className="flex-grow pt-16 relative z-10">{children}</main>

        {/* Gravity Footer - Blueprint Feature */}
        <GravityFooter />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

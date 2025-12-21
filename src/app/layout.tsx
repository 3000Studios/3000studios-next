/**
 * Root Layout Component
 * Main layout wrapper for the entire application
 * REVENUE LOCK — DO NOT MODIFY
 * Contains critical AdSense and monetization infrastructure
 * Removing ads.txt verification, consent logic, or ad scripts will break revenue
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
import { env } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: "3000 Studios - Award-Winning Creative Studio",
  description:
    "Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate.",
  keywords:
    "creative studio, digital agency, web development, premium design, innovation, 3D experiences, AI solutions",
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

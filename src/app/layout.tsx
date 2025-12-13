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

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import BackgroundMusic from "./components/BackgroundMusic";
import GravityFooter from "./components/GravityFooter";
import Navigation from "./components/Navigation";
import SmoothScroll from "./components/SmoothScroll";
import SoundEffects from "./components/SoundEffects";
import VideoWallpaper from "./components/VideoWallpaper";
import "./globals.css";

export const metadata: Metadata = {
  title: "3000 Studios - Award-Winning Creative Studio",
  description: "Premium digital experiences, innovative solutions, and transformative projects. 250+ successful clients worldwide with 99% satisfaction rate.",
  keywords: "creative studio, digital agency, web development, premium design, innovation, 3D experiences, AI solutions",
  authors: [{ name: "3000 Studios" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://3000studios.vercel.app",
    siteName: "3000 Studios",
    title: "3000 Studios - Award-Winning Creative Studio",
    description: "Premium digital experiences, innovative solutions, and transformative projects.",
    images: [
      {
        url: "/media/3000-logo.svg",
        width: 1200,
        height: 630,
        alt: "3000 Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@3000studios",
    title: "3000 Studios - Award-Winning Creative Studio",
    description: "Premium digital experiences, innovative solutions, and transformative projects.",
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
        <main className="flex-grow pt-16 relative z-10">
          {children}
        </main>

        {/* Gravity Footer - Blueprint Feature */}
        <GravityFooter />

        <Analytics />
      </body>
    </html>
  );
}


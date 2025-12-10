/**
 * Root Layout Component
 * Main layout wrapper for the entire application
 * Includes: Global metadata, navigation, footer, and common UI elements
 * Features from 3000structure.txt blueprint:
 * - Video wallpaper backgrounds
 * - Gravity physics footer
 * - Background music engine
 * - Ultra-luxe theme
 */

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navigation from "./components/Navigation";
import GravityFooter from "./components/GravityFooter";
import VideoWallpaper from "./components/VideoWallpaper";
import BackgroundMusic from "./components/BackgroundMusic";

export const metadata: Metadata = {
  title: "3000 Studios - Professional Creative Studio",
  description: "Cutting-edge digital experiences, creative projects, and innovative solutions",
  keywords: "creative studio, digital agency, web development, design, innovation",
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


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
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navigation from "./components/Navigation";
import GravityFooter from "./components/GravityFooter";
import VideoWallpaper from "./components/VideoWallpaper";
import BackgroundMusic from "./components/BackgroundMusic";
import SmoothScroll from "./components/SmoothScroll";
import SoundEffects from "./components/SoundEffects";

export const metadata: Metadata = {
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


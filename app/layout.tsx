// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import "./globals.css";
import NavBar from "../components/NavBar";
import VideoBackground from "../components/VideoBackground";
import ShadowConsole from "../components/ShadowConsole";
import { ReactNode } from "react";

export const metadata = {
  title: "3000 Studios | AI-Powered Creative Engine",
  description: "AI-driven creative engine powered by The Champ. Next.js, Vercel, and WordPress integration.",
  keywords: "AI, creative studio, web development, Next.js, WordPress",
  authors: [{ name: "3000 Studios" }],
  openGraph: {
    title: "3000 Studios",
    description: "AI-driven creative engine",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="text-white bg-black min-h-screen">
        <VideoBackground />
        <NavBar />
        
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        <ShadowConsole />

        <footer className="relative z-10 bg-black/60 backdrop-blur-xl border-t border-white/10 py-8 mt-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} 3000 Studios. Powered by Shadow AI.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Built with Next.js 15 + Vercel + WordPress API
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

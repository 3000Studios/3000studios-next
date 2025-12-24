<<<<<<< HEAD
import Link from "next/link";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-grow flex items-center justify-center px-6 relative z-10">
        <div className="text-center">
          <h1 className="font-display text-[15vw] leading-none text-white/5 select-none">
            404
          </h1>
          <div className="relative -mt-12 md:-mt-20">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6">
              Lost in the Void
            </h2>
            <p className="font-sans text-sm text-platinum/50 tracking-widest mb-10 max-w-md mx-auto">
              THE COORDINATES YOU SEEK DO NOT EXIST IN THIS REALITY.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-hologram hover:text-white transition-colors uppercase border-b border-hologram/30 pb-1 hover:border-white"
            >
              Return to Base
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
=======
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold mb-4 glow-text">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another
          dimension.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:scale-105 transition-transform"
        >
          Return Home
        </Link>
      </div>
    </div>
>>>>>>> origin/copilot/update-main-with-all-branches
  );
}

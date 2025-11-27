// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeHero() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-black">

      {/* BACKGROUND ANIMATION */}
      <div
        id="bg-anim"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #1a1a00, #000000)",
          opacity: 0.8
        }}
      />

      {/* CONTENT */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 
          className="text-5xl md:text-7xl lg:text-9xl font-extrabold text-yellow-400 drop-shadow-2xl animate-pulse"
          style={{
            textShadow: '0 0 40px rgba(251, 191, 36, 0.9), 0 0 80px rgba(251, 191, 36, 0.6), 0 8px 16px rgba(0, 0, 0, 0.9), 0 16px 32px rgba(0, 0, 0, 0.7)',
            transform: 'perspective(1000px) rotateX(5deg)',
            letterSpacing: '0.05em'
          }}
        >
          3000 STUDIOS
        </h1>
        <p className="text-xl md:text-3xl mt-6 text-yellow-200 opacity-90 font-bold" style={{
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(251, 191, 36, 0.5)'
        }}>
          AI. Automation. Entertainment. Power.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/projects"
            className="px-8 py-4 bg-gradient-to-br from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 rounded-xl font-bold text-black shadow-2xl transform hover:scale-110 transition-all duration-300"
            style={{
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 8px 16px rgba(0, 0, 0, 0.8)'
            }}
          >
            View Projects
          </Link>
          <Link
            href="/experience"
            className="px-8 py-4 bg-gradient-to-br from-yellow-600 to-orange-700 hover:from-yellow-500 hover:to-orange-600 rounded-xl font-bold text-white shadow-2xl transform hover:scale-110 transition-all duration-300"
            style={{
              boxShadow: '0 0 30px rgba(251, 146, 60, 0.6), 0 8px 16px rgba(0, 0, 0, 0.8)'
            }}
          >
            Experience
          </Link>
        </div>
      </div>

      {/* MOUSE TRAILS */}
      <canvas
        id="mouseTrailCanvas"
        className="absolute inset-0 pointer-events-none"
      />
    </section>
  );
}

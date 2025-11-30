"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.


import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });
const MiniGame = dynamic(() => import("@/components/MiniGame"), { ssr: false });
const LaserLights = dynamic(() => import("@/components/LaserLights"), { ssr: false });
const MouseTrails = dynamic(() => import("@/components/MouseTrails"), { ssr: false });
const RotatingCarousel = dynamic(() => import("@/components/RotatingCarousel"), { ssr: false });
const GuessingGame = dynamic(() => import("@/components/GuessingGame"), { ssr: false });

export default function ExperiencePage() {
  // For fun, interactive, luxury experience
  useEffect(() => {
    document.body.classList.add("custom-scrollbar");
    return () => document.body.classList.remove("custom-scrollbar");
  }, []);

  return (
    <div className="relative min-h-screen px-4 py-12 md:py-20 w-full max-w-full overflow-x-hidden bg-black text-white luxury-border glass">
      {/* Mouse and Laser Effects */}
      <LaserLights />
      <MouseTrails />

      {/* Luxury 3D Header */}
      <h1 className="text-3d text-5xl md:text-7xl font-black text-center mb-6 animate-fade-in-up">EXPERIENCE</h1>
      <p className="text-xl md:text-2xl text-center text-platinum mb-10 max-w-3xl mx-auto px-4 animate-fade-in-up">
        Welcome to the ultimate interactive showcase. Enjoy jazz, games, tech, and a luxury carousel of your own content!
      </p>

      {/* Jazz Music Player */}
      <div className="max-w-lg mx-auto mb-12 animate-fade-in-up">
        <MusicPlayer />
      </div>

      {/* Rotating Carousel for Personal Content */}
      <div className="mb-16 animate-fade-in-up">
        <RotatingCarousel />
      </div>

      {/* Guessing Game with Wormhole/Confetti */}
      <div className="mb-16 animate-fade-in-up">
        <GuessingGame />
      </div>

      {/* MiniGame Arcade */}
      <div className="mb-16 animate-fade-in-up">
        <MiniGame />
      </div>

      {/* Tech Stack Luxury Grid */}
      <div className="glass p-10 rounded-2xl max-w-4xl mx-auto mb-20 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-gold">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "TailwindCSS",
            "Node.js",
            "WordPress",
            "Vercel",
            "AWS",
          ].map((tech) => (
            <div
              key={tech}
              className="bg-black/40 p-4 rounded-lg text-center font-bold hover:bg-gold/20 transition-colors text-platinum text-xl shadow-lg"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

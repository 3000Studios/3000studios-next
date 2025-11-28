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
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-corporate-charcoal">
      {/* BACKGROUND ANIMATION */}
      <div
        id="bg-anim"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,#1a1a00,#000000)] opacity-80"
      />

      {/* CONTENT */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold text-corporate-gold drop-shadow-2xl animate-pulse tracking-wider hero-3d">
          3000 STUDIOS
        </h1>
        <p className="text-xl md:text-3xl mt-6 text-corporate-silver opacity-90 font-bold shadow-text">
          AI. Automation. Entertainment. Power.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/projects"
            className="px-8 py-4 bg-gold-gradient rounded-xl font-bold text-corporate-navy shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            View Projects
          </Link>
          <Link
            href="/experience"
            className="px-8 py-4 bg-steel-gradient rounded-xl font-bold text-white shadow-xl transform hover:scale-110 transition-all duration-300"
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

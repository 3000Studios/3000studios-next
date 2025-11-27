// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-black">

      {/* BACKGROUND ANIMATION */}
      <div
        id="bg-anim"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #001122, #000000)",
          opacity: 0.8
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-400 drop-shadow-xl">
          3000 STUDIOS
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-white opacity-80">
          AI. Automation. Entertainment. Power.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold text-white"
          >
            View Projects
          </Link>
          <Link
            href="/experience"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-white"
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

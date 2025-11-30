// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

export default function HeroSection() {
  return (
    <div className="absolute bottom-10 w-full text-center pointer-events-auto z-50">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 drop-shadow-lg">
        3000 STUDIOS — SHADOW CORE
      </h1>

      <p className="text-lg opacity-80 mt-3">
        Luxury x AI Command Center — Fully Activated
      </p>

      <div className="flex justify-center gap-6 mt-6">
        <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black rounded-xl shadow-xl hover:scale-105 transition">
          Enter Command Center
        </button>

        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-300 text-black rounded-xl shadow-xl hover:scale-105 transition">
          Launch Apps
        </button>
      </div>
    </div>
  );
}

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { Suspense } from "react";
import BackgroundHybrid from "@/components/BackgroundHybrid";
import ShadowAvatar from "@/components/ShadowAvatar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <BackgroundHybrid />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <div className="pointer-events-auto w-full h-full max-w-md">
            <ShadowAvatar />
          </div>
        </Suspense>
      </div>

      <HeroSection />
    </main>
  );
}

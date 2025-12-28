// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import EventBus from "@/components/os/EventBus";
import PrimeLoop from "@/components/os/PrimeLoop";
import SelfCheckLoop from "@/components/os/SelfCheckLoop";
import { AmbientAudio } from "@/components/ui/AmbientAudio";
import { Background } from "@/components/ui/Background";
import { GlobalEffects } from "@/components/ui/GlobalEffects";
import { FramerMotionProvider } from "@/components/ui/MotionProvider";
import FusionEventHandler from "@/components/world/FusionEventHandler";
import MoodMap from "@/components/world/MoodMap";
import type { CSSProperties, ReactNode } from "react";
import NavBar from "../components/NavBar";
import ScrollEffects from "../components/ui/ScrollEffects";
import SoundToggle from "../components/ui/SoundToggle";
import "./globals.css";

const fontFallbacks = {
  "--font-italiana": "Italiana, serif",
  "--font-space-grotesk": "Space Grotesk, sans-serif",
  "--font-syne": "Syne, sans-serif",
  "--font-manrope": "Manrope, sans-serif",
} as CSSProperties;

export const metadata = {
  title: "3000 Studios | Platinum Ether",
  description: "Elite Visual Experience by 3000 Studios",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" style={fontFallbacks}>
      <body className="antialiased selection:bg-hologram selection:text-white overflow-x-hidden bg-void text-mercury">
        <NavBar />
        {/* Shadow PRIME OS - Core Systems */}
        <EventBus />
        <PrimeLoop />
        <SelfCheckLoop />
        <FusionEventHandler />
        <MoodMap />

        {/* Visual Layer */}
        <Background />
        <GlobalEffects />
          <ScrollEffects />
          <SoundToggle />
        <AmbientAudio />
        <FramerMotionProvider>
          <div className="relative z-10">{children}</div>
        </FramerMotionProvider>
      </body>
    </html>
  );
}

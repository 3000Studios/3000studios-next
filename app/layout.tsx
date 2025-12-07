// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import "./globals.css";
import { MarbleBG } from "@/components/ui/MarbleBG";
import { AmbientAudio } from "@/components/ui/AmbientAudio";
import { FramerMotionProvider } from "@/components/ui/MotionProvider";
import EventBus from "@/components/os/EventBus";
import PrimeLoop from "@/components/os/PrimeLoop";
import SelfCheckLoop from "@/components/os/SelfCheckLoop";
import FusionEventHandler from "@/components/world/FusionEventHandler";
import MoodMap from "@/components/world/MoodMap";

export const metadata = {
  title: "3000 Studios",
  description: "Elite Visual Experience by 3000 Studios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden bg-black text-white selection:bg-gold/40">
        {/* Shadow PRIME OS - Core Systems */}
        <EventBus />
        <PrimeLoop />
        <SelfCheckLoop />
        <FusionEventHandler />
        <MoodMap />
        
        {/* Visual Layer */}
        <MarbleBG />
        <AmbientAudio />
        <FramerMotionProvider>
          <div className="relative z-10">{children}</div>
        </FramerMotionProvider>
      </body>
    </html>
  );
}

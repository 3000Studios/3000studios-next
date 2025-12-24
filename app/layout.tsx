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
// Temporarily disabled Google Fonts due to network restrictions in build environment
// import { Italiana, Space_Grotesk, Syne, Manrope } from "next/font/google";

// const italiana = Italiana({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-italiana",
// });

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-space-grotesk",
// });

// const syne = Syne({
//   subsets: ["latin"],
//   variable: "--font-syne",
// });

// const manrope = Manrope({
//   subsets: ["latin"],
//   variable: "--font-manrope",
// });

export const metadata = {
  title: "3000 Studios | Platinum Ether",
=======

export const metadata = {
  title: "3000 Studios",
>>>>>>> origin/copilot/update-main-with-all-branches
  description: "Elite Visual Experience by 3000 Studios",
};

export default function RootLayout({
  children,
}: {
    <html
      lang="en"
      className="font-sans"
    >
      <body className="antialiased selection:bg-hologram selection:text-white overflow-x-hidden bg-void text-mercury">
=======
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden bg-black text-white selection:bg-gold/40">
>>>>>>> origin/copilot/update-main-with-all-branches
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

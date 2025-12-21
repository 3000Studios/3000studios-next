"use client";
import React from "react";
import dynamic from "next/dynamic";

const Video = dynamic(() => import("next-video"), { ssr: false });

export function MarbleBG() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Background Video */}
      <Video
        src="https://sora.chatgpt.com/p/s_6926f554649c819189288f78300ea72f?psh=HXVzZXItZ0w5WTM4R1NrZjB4WWJxOFUzcnFjRWlk.id2dyVpG-UvJa"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover opacity-60"
      />
      {/* Gold overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent mix-blend-screen" />
      {/* Shine */}
      <div className="absolute inset-0 marble-shine" />
    </div>
  );
}

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover opacity-30 -z-50"
      style={{ filter: 'brightness(0.7) contrast(1.1)' }}
      src="/corporate-bg.mp4"
      onError={(e) => {
        // Fallback to gradient if video fails
        const target = e.target as HTMLVideoElement;
        target.style.display = 'none';
      }}
    />
  );
}

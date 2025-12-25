"use client";

import { useEffect, useRef } from "react";

export default function MarbleBG() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60"
      >
        <source
          src="https://res.cloudinary.com/dpp23/video/upload/v1706648975/marble-flow_z1x8h2.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

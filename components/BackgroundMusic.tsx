"use client";
import { useEffect } from "react";

export default function BackgroundMusic({ src }: { src: string }) {
  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.25;
    // Play needs user interaction in most browsers, catch error silently
    audio.play().catch(() => console.log("Audio autoplay blocked - waiting for interaction"));
    
    // Add global click listener to start audio if blocked
    const unlock = () => {
        audio.play().catch(() => {});
        window.removeEventListener('click', unlock);
    };
    window.addEventListener('click', unlock);

    return () => {
        audio.pause();
        window.removeEventListener('click', unlock);
    };
  }, [src]);

  return null;
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive Sound Effects System
 * Plays sophisticated click sounds and ambient audio
 */
export default function SoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window === "undefined") return;

    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();

    // Function to create a sophisticated click sound
    const playClickSound = () => {
      if (!audioContextRef.current) return;

      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      // Sophisticated tone - higher frequency for elegant sound
      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      // Envelope for natural sound
      const now = context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      oscillator.start(now);
      oscillator.stop(now + 0.1);
    };

    // Function to create a hover sound
    const playHoverSound = () => {
      if (!audioContextRef.current) return;

      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.value = 600;
      oscillator.type = "sine";

      const now = context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      oscillator.start(now);
      oscillator.stop(now + 0.08);
    };

    // Add click sound to all interactive elements
    const addSoundToElements = () => {
      const buttons = document.querySelectorAll('button, a, [role="button"]');

      buttons.forEach((element) => {
        element.addEventListener("click", playClickSound);
        element.addEventListener("mouseenter", playHoverSound);
      });
    };

    // Initial setup
    addSoundToElements();

    // Observer to add sounds to dynamically added elements
    const observer = new MutationObserver(() => {
      addSoundToElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

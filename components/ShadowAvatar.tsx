/*
 * Copyright (c) 2025 NAME.
 * All rights reserved.
 * Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Constants
const SPEAKING_DURATION_MS = 3000;

// Audio configuration
const AUDIO_PATH = "/audio/shadow-voice.mp3";
let audioFileExists: boolean | null = null; // Cache audio file existence check

/**
 * ShadowAvatar - A CSS-based animated avatar with parallax and voice interaction
 * This component provides a full-body avatar visualization without Three.js dependencies
 */
export default function ShadowAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [verticalFloatOffset, setVerticalFloatOffset] = useState(0);

  // Initialize audio element once (with cached file existence check)
  useEffect(() => {
    const initAudio = async () => {
      // Use cached result if available
      if (audioFileExists === false) return;
      
      if (audioFileExists === null) {
        try {
          const response = await fetch(AUDIO_PATH, { method: "HEAD" });
          audioFileExists = response.ok;
        } catch {
          audioFileExists = false;
          return;
        }
      }
      
      if (audioFileExists) {
        audioRef.current = new Audio(AUDIO_PATH);
      }
    };

    initAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Cleanup speaking timeout on unmount
  useEffect(() => {
    return () => {
      if (speakingTimeoutRef.current) {
        clearTimeout(speakingTimeoutRef.current);
      }
    };
  }, []);

  // Floating animation using requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      setVerticalFloatOffset(Math.sin(elapsed * 0.6) * 5);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      setMousePos({ x: x * 20, y: y * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = useCallback(() => {
    // Trigger speaking animation
    setIsSpeaking(true);
    
    // Try to play voice audio using reusable audio element
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Audio play failed - continue with animation only
      });
    }
    
    // Clear any existing timeout
    if (speakingTimeoutRef.current) {
      clearTimeout(speakingTimeoutRef.current);
    }
    
    // Stop speaking animation after a delay
    speakingTimeoutRef.current = setTimeout(() => setIsSpeaking(false), SPEAKING_DURATION_MS);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label="Activate Shadow voice"
      role="button"
      aria-label="Activate Shadow voice"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Avatar Container with Parallax */}
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateY(${verticalFloatOffset}px)`,
        }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 blur-3xl bg-cyan-500/20 rounded-full scale-150 animate-pulse" />
        
        {/* Avatar Body */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Head */}
          <div
            className={`relative w-24 h-24 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 shadow-2xl border-2 border-gray-600 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
          >
            {/* Eyes */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
              <div
                className={`w-4 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 ${isHovered ? "animate-pulse" : ""}`}
                style={{
                  boxShadow: "0 0 20px 5px rgba(0, 197, 255, 0.5)",
                }}
              />
              <div
                className={`w-4 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 ${isHovered ? "animate-pulse" : ""}`}
                style={{
                  boxShadow: "0 0 20px 5px rgba(0, 197, 255, 0.5)",
                }}
              />
            </div>
            
            {/* Mouth/Jaw */}
            <div
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-800 rounded-b-lg transition-all duration-100 ${isSpeaking ? "animate-bounce h-4" : ""}`}
            />
          </div>
          
          {/* Neck */}
          <div className="w-8 h-4 bg-gradient-to-b from-gray-800 to-gray-900" />
          
          {/* Torso */}
          <div className="relative w-40 h-56 bg-gradient-to-b from-gray-800 to-gray-950 rounded-lg shadow-2xl border border-gray-700">
            {/* Chest Glow Line */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-cyan-500 rounded-full"
              style={{
                boxShadow: "0 0 15px 3px rgba(0, 197, 255, 0.4)",
              }}
            />
            
            {/* Core Light */}
            <div
              className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400/80 ${isHovered ? "animate-ping" : "animate-pulse"}`}
              style={{
                boxShadow: "0 0 30px 10px rgba(0, 197, 255, 0.3)",
              }}
            />
          </div>
          
          {/* Legs */}
          <div className="flex gap-2 -mt-1">
            <div className="w-14 h-44 bg-gradient-to-b from-gray-900 to-gray-950 rounded-b-lg shadow-xl border-x border-b border-gray-700" />
            <div className="w-14 h-44 bg-gradient-to-b from-gray-900 to-gray-950 rounded-b-lg shadow-xl border-x border-b border-gray-700" />
          </div>
        </div>
        
        {/* Floor Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-cyan-900/30 rounded-full blur-xl" />
      </div>
      
      {/* Interaction Hint */}
      <div className={`absolute bottom-4 text-cyan-400 text-sm transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"}`}>
        Click to activate voice
      </div>
    </div>
  );
}

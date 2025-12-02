"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function ShadowAvatar(): JSX.Element {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  const rafRef = useRef<number | null>(null);
  const floatStartRef = useRef<number | null>(null);
  const speakingTimeoutRef = useRef<number | null>(null);

  // Floating animation using requestAnimationFrame
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (floatStartRef.current === null) floatStartRef.current = timestamp;
      const elapsed = (timestamp - floatStartRef.current) / 1000;
      // amplitude 5px, speed factor 0.6
      setFloatOffset(Math.sin(elapsed * 0.6) * 5);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      floatStartRef.current = null;
    };
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = ((e.clientX / w) - 0.5) * 20; // -10 .. 10 deg
      const y = ((e.clientY / h) - 0.5) * 20; // -10 .. 10 deg
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Ensure speaking timeout is cleared on unmount
  useEffect(() => {
    return () => {
      if (speakingTimeoutRef.current !== null) {
        clearTimeout(speakingTimeoutRef.current);
        speakingTimeoutRef.current = null;
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    setIsSpeaking(true);

    // clear any existing timeout
    if (speakingTimeoutRef.current !== null) {
      clearTimeout(speakingTimeoutRef.current);
      speakingTimeoutRef.current = null;
    }

    speakingTimeoutRef.current = window.setTimeout(() => {
      setIsSpeaking(false);
      speakingTimeoutRef.current = null;
    }, 3000);
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSpeaking}
      style={{ cursor: "pointer" }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateY(${floatOffset}px)`,
        }}
      >
        {/* Replace the block below with your avatar SVG/markup */}
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-xl flex items-center justify-center text-white select-none ${
            isSpeaking ? "ring-4 ring-yellow-400 animate-pulse" : ""
          }`}
        >
          {/* Example initials or icon */}
          <span className="font-semibold">SM</span>
        </div>
      </div>

      {/* Glow / shadow layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="w-full h-full rounded-full"
          style={{
            boxShadow: isHovered
              ? "0 20px 40px rgba(99,102,241,0.2)"
              : "0 10px 20px rgba(0,0,0,0.08)",
            transition: "box-shadow 200ms ease",
          }}
        />
      </div>
    </div>
  );
}

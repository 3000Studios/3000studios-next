"use client";

import React, { useEffect, useRef } from "react";

export const GlobalEffects = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorDot.style.left = `${x - 4}px`;
      cursorDot.style.top = `${y - 4}px`;

      cursorRing.animate(
        {
          left: `${x - 20}px`,
          top: `${y - 20}px`,
        },
        { duration: 500, fill: "forwards" },
      );
    };

    window.addEventListener("mousemove", onMouseMove);

    // Hover states for magnetic triggers
    const handleMouseEnter = () => {
      cursorRing.classList.add("active");
      cursorDot.style.transform = "scale(0)";
    };

    const handleMouseLeave = () => {
      cursorRing.classList.remove("active");
      cursorDot.style.transform = "scale(1)";
    };

    // We need to delegate or attach listeners to elements.
    // Since elements are dynamic, delegation is better or we can attach to specific selectors.
    // For now, let's attach to document and check target.

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".magnetic-trigger") ||
        target.closest("a") ||
        target.closest("button")
      ) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    };

    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorRingRef} className="cursor-ring hidden md:block"></div>
    </>
  );
};

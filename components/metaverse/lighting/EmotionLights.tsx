"use client";

import { useEffect, useRef, useState } from "react";

export default function EmotionLights({ lightRef }) {
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!String(e.data).startsWith("emotion:")) return;

      const mood = e.data.replace("emotion:", "");

      if (mood === "happy") setColor("#ffd700"); // gold glow
      if (mood === "angry") setColor("#ff3300"); // fire red
      if (mood === "sad") setColor("#3399ff"); // blue night
      if (mood === "surprised") setColor("#ffffff"); // flash white
      if (mood === "neutral") setColor("#bbbbbb"); // soft neutral
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    if (lightRef.current) lightRef.current.color.set(color);
  }, [color]);

  return null;
}

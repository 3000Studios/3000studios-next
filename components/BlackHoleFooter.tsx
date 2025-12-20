"use client";
import { useEffect } from "react";

export default function BlackHoleFooter() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ height: "400px", background: "black" }}>
      <iframe
        src="https://codepen.io/VoXelo/full/wBKvJxd"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}

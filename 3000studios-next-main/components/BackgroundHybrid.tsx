'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundHybrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function loop() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(loop);
    }
    loop();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />;
}
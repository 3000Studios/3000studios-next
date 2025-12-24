import { useEffect, useRef } from "react";

export default function MouseTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trails: { x: number; y: number; alpha: number }[] = [];
    function onMove(e: MouseEvent) {
      mouse = { x: e.clientX, y: e.clientY };
      trails.push({ x: mouse.x, y: mouse.y, alpha: 1 });
      if (trails.length > 60) trails.shift();
    }
    window.addEventListener("mousemove", onMove);
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trails.length; i++) {
        const t = trails[i];
        ctx.save();
        ctx.globalAlpha = t.alpha;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 16, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${220 + i * 2}, 100%, 60%)`;
        ctx.shadowBlur = 16;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.restore();
        t.alpha *= 0.96;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}

// @ts-nocheck
import { useEffect } from "react";

export default function ConfettiEffect({ show }: { show: boolean }) {
  useEffect(() => {
    if (!show) return;
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.7 },
        zIndex: 99999,
      });
    });
  }, [show]);
  return null;
}

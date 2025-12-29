"use client";

import { useFrame } from "@react-three/fiber";

export default function useIdleMotion(ref: any) {
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y =
      -1.3 + Math.sin(clock.elapsedTime * 1.5) * 0.03;
  });
}

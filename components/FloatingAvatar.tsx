import * as THREE from 'three';
/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#fbbf24"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function FloatingAvatar() {
  return (
    <div
      className="fixed bottom-6 right-6 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden z-40 shadow-2xl border-4 border-yellow-400"
      style={{
        boxShadow:
          "0 0 60px rgba(251, 191, 36, 0.8), 0 8px 32px rgba(0, 0, 0, 0.9)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#f59e0b"
        />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}

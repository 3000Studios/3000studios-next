"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Sparkles,
  Capsule,
  Cylinder
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// 3D Model: Cyber Female Entity (Placeholder for GLB)
function CyberAvatar({ expression, isSpeaking }: { expression: string, isSpeaking: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  // Physics: Mouse Tracking & Breathing
  useFrame((state) => {
    if (groupRef.current) {
      // Breathing / Floating
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 - 1.5; 
      
      // Mouse Parallax (Subtle)
      const mouseX = state.mouse.x * 0.2;
      const mouseY = state.mouse.y * 0.1;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.1);
    }

    if (headRef.current && isSpeaking) {
      headRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 15) * 0.05;
    }
  });

  const getEyeColor = () => {
    if (expression === 'happy') return '#00ffcc'; // Teal
    if (expression === 'angry') return '#ff0000'; // Red
    if (expression === 'talking') return '#ffff00'; // Gold
    return '#00aaff'; // Default Blue
  };

  return (
    <group ref={groupRef} scale={1.2}>
      {/* ... (Same geometry as before) ... */}
           {/* --- HEAD --- */}
      <group position={[0, 1.6, 0]}>
        {/* Face */}
        <Sphere args={[0.35, 64, 64]} ref={headRef}>
          <MeshDistortMaterial
            color="#e0e0e0"
            distort={0.15} /* Liquid Metal Skin */
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive={getEyeColor()}
            emissiveIntensity={0.1}
          />
        </Sphere>
        
        {/* Eyes (Glowing) */}
        <Sphere position={[-0.12, 0.05, 0.3]} args={[0.04]}>
          <meshStandardMaterial color={getEyeColor()} emissive={getEyeColor()} emissiveIntensity={2} />
        </Sphere>
        <Sphere position={[0.12, 0.05, 0.3]} args={[0.04]}>
          <meshStandardMaterial color={getEyeColor()} emissive={getEyeColor()} emissiveIntensity={2} />
        </Sphere>

        {/* Cyber Halo */}
        <Float speed={5} rotationIntensity={0.5}>
          <Cylinder args={[0.5, 0.5, 0.02, 32]} rotation={[1.5, 0, 0]}>
            <meshBasicMaterial color={getEyeColor()} transparent opacity={0.3} wireframe />
          </Cylinder>
        </Float>
      </group>

      {/* --- NECK --- */}
      <Cylinder position={[0, 1.2, 0]} args={[0.1, 0.15, 0.4]} />

      {/* --- TORSO --- */}
      <group position={[0, 0.5, 0]}>
        {/* Upper Body */}
        <Capsule args={[0.3, 0.8, 8, 16]}>
             <meshStandardMaterial color="#202020" metalness={0.9} roughness={0.1} />
        </Capsule>
        
        {/* Core Reactor (Heart) */}
        <Sphere position={[0, 0.2, 0.25]} args={[0.1]}>
           <meshStandardMaterial color={getEyeColor()} emissive={getEyeColor()} emissiveIntensity={2} />
        </Sphere>
      </group>

      {/* --- SHOULDERS & ARMS (Visual Hints) --- */}
      <Sphere position={[-0.45, 0.9, 0]} args={[0.2]}>
         <meshStandardMaterial color="#404040" metalness={0.8} />
      </Sphere>
      <Sphere position={[0.45, 0.9, 0]} args={[0.2]}>
         <meshStandardMaterial color="#404040" metalness={0.8} />
      </Sphere>
    </group>
  );
}

export default function AvatarScene({ expression, isSpeaking }: { expression: string, isSpeaking: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
      <pointLight position={[-5, -5, 5]} intensity={2} color="#ff00ff" />
      <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

      <CyberAvatar expression={expression} isSpeaking={isSpeaking} />

      <Sparkles count={50} scale={4} size={3} speed={0.4} opacity={0.2} color="#00ffcc" />
      
      <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={1.2} 
          maxPolarAngle={1.8} 
          minAzimuthAngle={-0.5} 
          maxAzimuthAngle={0.5}
      />
    </Canvas>
  );
}

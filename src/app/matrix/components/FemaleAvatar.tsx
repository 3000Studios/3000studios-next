"use client";

<<<<<<< HEAD
import {
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  Sphere,
  Text,
  Torus,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function GyroCyberHead() {
  const meshRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Gamma: Left/Right tilt (-90 to 90)
      // Beta: Front/Back tilt (-180 to 180)
      const x = event.beta ? (event.beta * Math.PI) / 180 : 0;
      const y = event.gamma ? (event.gamma * Math.PI) / 180 : 0;
      setTargetRotation({ x, y });
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Simulate tilt with mouse for desktop testing
      const x = (event.clientY / window.innerHeight - 0.5) * Math.PI;
      const y = (event.clientX / window.innerWidth - 0.5) * Math.PI;
      setTargetRotation({ x, y });
    };

    // Check for DeviceOrientation support
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth interpolation for the "falling" effect
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.x,
        0.1,
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.y,
        0.1,
      );

      // Add some idle float
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
=======
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Sparkles, Text, Torus } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function CyberHead() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
>>>>>>> origin/pr/50
    }
  });

  return (
<<<<<<< HEAD
    <group ref={meshRef}>
      {/* Main Head Interface */}
      <group>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#00ffcc"
            emissive="#0044ff"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={1}
            distort={0.4}
            speed={3}
            wireframe
          />
        </Sphere>

        {/* Inner Core */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial color="#000000" />
        </Sphere>
      </group>

      {/* Holographic Rings - Reacting to tilt by rotating conventionally */}
      <group rotation={[1.5, 0, 0]}>
        <Torus args={[1.5, 0.02, 16, 100]}>
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.3} />
        </Torus>
      </group>

      <group rotation={[0, 1, 0.5]}>
        <Torus args={[1.8, 0.01, 16, 100]}>
          <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
        </Torus>
      </group>

      {/* Eyes / Sensors that always look at cam? */}
      <group position={[0, 0.2, 0.8]}>
        <mesh position={[-0.3, 0, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
          <pointLight intensity={1} distance={0.5} color="#fff" />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
          <pointLight intensity={1} distance={0.5} color="#fff" />
        </mesh>
=======
    <group>
      {/* Main Head Interface */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial
            color="#00ffcc"
            emissive="#0044ff"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={2}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Holographic Rings */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.2}>
        <Torus args={[1.5, 0.02, 16, 100]} rotation={[1.5, 0, 0]}>
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.3} />
        </Torus>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.3}>
        <Torus args={[1.8, 0.01, 16, 100]} rotation={[0, 1, 0.5]}>
          <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
        </Torus>
      </Float>

      {/* Eyes / Sensors */}
      <group position={[0, 0.2, 0.8]}>
         <mesh position={[-0.3, 0, 0]}>
            <sphereGeometry args={[0.08]} />
            <meshBasicMaterial color="#ffffff" />
         </mesh>
         <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.08]} />
            <meshBasicMaterial color="#ffffff" />
         </mesh>
>>>>>>> origin/pr/50
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
<<<<<<< HEAD
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ffff" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={2} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#00ffcc"
      />

      <GyroCyberHead />

      <Sparkles
        count={200}
        scale={6}
        size={2}
        speed={0.5}
        opacity={0.5}
        color="#00ffcc"
      />

      <Text
        position={[0, -2.5, 0]}
        fontSize={0.2}
=======
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={1.5} />
      
      <CyberHead />
      
      <Sparkles count={100} scale={5} size={2} speed={0.4} opacity={0.5} color="#00ffcc" />
      
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
>>>>>>> origin/pr/50
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2"
      >
<<<<<<< HEAD
        GYROSCOPE // ACTIVE
=======
        AI SYSTEM // ONLINE
>>>>>>> origin/pr/50
      </Text>
    </>
  );
}

export default function FemaleAvatar() {
  return (
<<<<<<< HEAD
    <div className="w-full h-full relative group">
      <Canvas>
        <Scene />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase">
            Neural Link: Stable
          </span>
        </div>
      </div>
=======
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-cyan-500/30 bg-black/50 relative group">
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-cyan-400 text-xs font-mono tracking-widest">AVATAR INTERFACE</span>
        </div>
      </div>
      
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Scene />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-gray-500 font-mono">RENDER: R3F // ENGINE: NEURAL</span>
      </div>
>>>>>>> origin/pr/50
    </div>
  );
}

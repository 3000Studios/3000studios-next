/**
 * Avatar Scene - R3F 3D Scene
 * Renders the 3D avatar with physics and animations
 */

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import AvatarMesh from "./AvatarMesh";

export default function AvatarScene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      className="bg-transparent"
    >
      <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={45} />
      
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <AvatarMesh />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}

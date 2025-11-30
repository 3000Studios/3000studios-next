'use client';
import { Canvas } from '@react-three/fiber';

export default function ShadowAvatar() {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
        <ambientLight intensity={1} />
        <mesh>
          <boxGeometry args={[1, 2, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </Canvas>
    </div>
  );
}
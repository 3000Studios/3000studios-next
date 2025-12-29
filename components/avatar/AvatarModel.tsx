"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import useSpeech from "./useSpeech";
import useLipSync from "./useLipSync";
import useIdleMotion from "./useIdleMotion";
import useFaceTracking from "./useFaceTracking";

export default function AvatarModel() {
  const group = useRef<Group>(null);
  
  // Try to load avatar model, fallback to a placeholder if not found
  let scene = null;
  try {
    const gltf = useGLTF("/models/avatar.glb");
    scene = gltf.scene;
  } catch {
    // Will use a placeholder sphere if model doesn't exist
    scene = null;
  }

  useIdleMotion(group);
  useLipSync(group);
  useFaceTracking(group);
  useSpeech();

  return (
    <group ref={group} position={[0, -1.3, 0]} scale={1.05}>
      {scene ? (
        <primitive object={scene} />
      ) : (
        // Placeholder sphere if no model is available
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
      )}
    </group>
  );
}

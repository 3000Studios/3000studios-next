// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";

function AvatarSphere({ talking }: { talking: boolean }) {
  return (
    <Sphere args={[0.8, 32, 32]}>
      <meshStandardMaterial
        color={talking ? "#fbbf24" : "#fcd34d"}
        emissive={talking ? "#f59e0b" : "#eab308"}
        emissiveIntensity={talking ? 0.8 : 0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
}

export default function CompactAvatar() {
  const [open, setOpen] = useState(false);
  const [talking, setTalking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    if (!voiceEnabled || !open) {
      setTalking(false);
      return;
    }

    if (!navigator.mediaDevices) return;

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let animationFrame: number;
    let stream: MediaStream;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mediaStream) => {
        stream = mediaStream;
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        const detectSpeech = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          const normalizedVolume = average / 255;
          setTalking(normalizedVolume > 0.02);
          animationFrame = requestAnimationFrame(detectSpeech);
        };

        detectSpeech();
      })
      .catch((error) => {
        console.error("Microphone access denied", error);
        setVoiceEnabled(false);
      });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioContext) audioContext.close();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [voiceEnabled, open]);

  return (
    <>
      {/* Avatar Toggle Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 cursor-pointer shadow-2xl border-4 border-yellow-300 flex items-center justify-center hover:scale-110 transition-all z-50"
        style={{
          boxShadow:
            "0 0 40px rgba(251, 191, 36, 0.8), 0 8px 16px rgba(0, 0, 0, 0.9)",
        }}
      >
        <span className="text-3xl md:text-4xl">🤖</span>
      </div>

      {/* Compact Avatar Panel */}
      {open && (
        <div
          className="fixed bottom-28 right-6 w-80 md:w-96 h-96 bg-black/95 border-2 border-yellow-500 rounded-2xl shadow-2xl flex flex-col z-50"
          style={{
            boxShadow:
              "0 0 60px rgba(251, 191, 36, 0.6), 0 16px 32px rgba(0, 0, 0, 0.9)",
          }}
        >
          <div className="p-4 border-b border-yellow-500 text-yellow-400 font-bold text-center text-lg">
            SHADOW AVATAR
          </div>

          {/* 3D Avatar */}
          <div className="flex-1 relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
              <ambientLight intensity={0.5} />
              <pointLight position={[2, 2, 2]} intensity={1} color="#fbbf24" />
              <pointLight
                position={[-2, -2, -2]}
                intensity={0.5}
                color="#f59e0b"
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={talking ? 8 : 2}
              />

              <Suspense fallback={null}>
                <AvatarSphere talking={talking} />
              </Suspense>
            </Canvas>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-yellow-500 space-y-3">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-full px-4 py-2 rounded-lg font-bold transition-all ${
                voiceEnabled
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {voiceEnabled ? "🎤 Voice Active" : "🎤 Enable Voice"}
            </button>
            {voiceEnabled && (
              <div className="text-center text-yellow-400 text-sm font-mono">
                {talking ? "● TALKING" : "○ Listening..."}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

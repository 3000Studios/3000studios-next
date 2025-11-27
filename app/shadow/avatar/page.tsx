// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useLLMFusionCore } from "@/brain/llmFusionCore";
import ShadowSubtitle from "@/components/ShadowSubtitle";
import { Suspense, useEffect, useState } from "react";
import ShadowAvatar from "./shadowAvatar";
import useVoiceAvatar from "@/hooks/useVoiceAvatar";

export default function AvatarPage() {
  const [wsMsg, setWsMsg] = useState("");
  const [connected, setConnected] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const voice = useVoiceAvatar();
  const llm = useLLMFusionCore();
  
  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3334");

    ws.onopen = () => {
      setConnected(true);
      setWsMsg("Shadow Avatar Online");
    };

    ws.onmessage = (e) => {
      setWsMsg(e.data);
    };

    ws.onerror = () => {
      setConnected(false);
      setWsMsg("Connection error");
    };

    ws.onclose = () => {
      setConnected(false);
      setWsMsg("Disconnected");
    };

    // Send voice state to WebSocket
    if (connected && voiceEnabled) {
      ws.send(JSON.stringify({
        type: "voice",
        mood: voice.mood,
        volume: voice.volume,
        talking: voice.talking
      }));
    }
  // Send transcript to LLM and show reply
  useEffect(() => {
    const transcript = (voice as any)?.transcript;
    if (voiceEnabled && transcript) {
      llm.sendToLLM(transcript).then((reply) => {
        setWsMsg(reply);
      });
    }
  }, [(voice as any)?.transcript, voiceEnabled]);

    return () => ws.close();
  }, [voice, connected, voiceEnabled]);

  return (
    <div style={{ height: "100vh", background: "#000014", color: "#00ffff", position: "relative" }}>
      <Canvas>
      <ShadowSubtitle />
        <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={40} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 5]} intensity={2} />
        <directionalLight position={[-2, 2, -5]} intensity={1} color="#0080ff" />
        <pointLight position={[0, 2, 0]} intensity={1} color="#00ffff" />
        
        <OrbitControls 
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />

        <Suspense fallback={null}>
          <ShadowAvatar message={wsMsg} voiceState={voiceEnabled ? voice : null} />
        </Suspense>

        <gridHelper args={[10, 10, "#00ffff", "#003"]} position={[0, -1.5, 0]} />
      </Canvas>

      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "20px",
        borderRadius: "12px",
        border: "2px solid #00ffff",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
      }}>
        <h1 style={{
          fontSize: "2rem",
          margin: "0 0 10px 0",
          textShadow: "0 0 10px #00ffff"
        }}>SHADOW AVATAR</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: connected ? "#00ff00" : "#ff0000",
            boxShadow: connected ? "0 0 10px #00ff00" : "0 0 10px #ff0000"
          }}></span>
          <span style={{ color: connected ? "#00ff00" : "#ff0000", fontWeight: "700" }}>
            {connected ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
        <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>{wsMsg}</p>
        <p style={{ margin: "10px 0 0 0", fontSize: "0.8rem", color: "#00bcd4" }}>
          WebSocket: ws://localhost:3334
        </p>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            style={{
              padding: "8px 16px",
              backgroundColor: voiceEnabled ? "#00ff00" : "#666",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.85rem"
            }}
          >
            {voiceEnabled ? "🎤 Voice Active" : "🎤 Enable Voice"}
          </button>
        </div>
        {voiceEnabled && (
          <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#ffff00" }}>
            <div>Mood: {voice.mood}</div>
            <div>Volume: {(voice.volume * 100).toFixed(0)}%</div>
            <div>Talking: {voice.talking ? "YES" : "NO"}</div>
          </div>
        )}
      </div>

      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #00ffff",
        fontSize: "0.85rem"
      }}>
        Drag to rotate • Scroll to zoom • Double-click to reset
      </div>
    </div>
  );
}

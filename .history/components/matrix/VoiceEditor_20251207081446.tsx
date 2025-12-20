/**
 * Voice Editor Component
 * Real-time voice-to-code system for THE MATRIX
 */

"use client";

import { useState, useEffect } from "react";
import { useShadowOS } from "@/lib/shadow/os/state";

export default function VoiceEditor() {
  const [command, setCommand] = useState("");
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { voiceActive, setVoiceActive } = useShadowOS();

  useEffect(() => {
    if (!voiceActive) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setCommand(transcript);
      
      // Send to AI interpreter
      try {
        const res = await fetch("/api/shadow/edit/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spoken: transcript }),
        });
        
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error("Voice command error:", error);
      }
    };

    recognition.start();
    setListening(true);

    return () => {
      recognition.stop();
      setListening(false);
    };
  }, [voiceActive]);

  return (
    <div className="bg-black/40 backdrop-blur-xl border-2 border-gold p-6 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gold">Voice Editor</h2>
        <button
          onClick={() => setVoiceActive(!voiceActive)}
          className={`px-4 py-2 rounded-lg font-bold ${
            voiceActive 
              ? "bg-red-500 text-white animate-pulse" 
              : "bg-gold text-black"
          }`}
        >
          {voiceActive ? "🎤 LISTENING..." : "Start Voice"}
        </button>
      </div>

      {listening && (
        <div className="text-center text-sapphire mb-4 animate-pulse">
          🎙️ Voice recognition active...
        </div>
      )}

      <div className="bg-black/60 p-4 rounded mb-4 border border-sapphire min-h-[80px]">
        <p className="text-lg text-white">
          {command || "Say a command to edit the site..."}
        </p>
      </div>

      {result && (
        <div className="bg-black/60 p-4 rounded border border-purple-500">
          <p className="text-sm text-purple-300">
            ✅ {result.message || "Command processed"}
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p><strong>Try saying:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>"Deploy the site now"</li>
          <li>"Change the background to neon blue"</li>
          <li>"Add a new products section"</li>
          <li>"Update the homepage title"</li>
        </ul>
      </div>
    </div>
  );
}

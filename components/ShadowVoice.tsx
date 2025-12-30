"use client";

/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import shadowClient from "@/lib/shadowClient";

export default function ShadowVoice() {
  const [status, setStatus] = useState("idle");
  const recognizer = useRef<any>(null);

  // ---- HOTWORD DETECT ----
  const HOTWORDS = ["hey dude", "shadow", "hey shadow"];

  async function processCommand(text: string) {
    setStatus("processing…");

    const res = await shadowClient.exec(text);

    console.log("AI EXEC →", res);
    setStatus("listening");

    return res;
  }

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("SpeechRecognition unsupported.");
      return;
    }

    recognizer.current = new SpeechRecognition();
    recognizer.current.continuous = true;
    recognizer.current.interimResults = true;

    recognizer.current.onresult = (event: any) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript.toLowerCase();
      }

      console.log("LISTEN:", text);

      // Check for hotword
      if (HOTWORDS.some((w) => text.includes(w))) {
        new Audio("/wake.mp3").play();
        setStatus("Hotword detected — speak command");

        setTimeout(() => {
          recognizer.current.stop();
          listenForCommand();
        }, 500);
      }
    };

    recognizer.current.start();
    setStatus("listening");

    return () => recognizer.current?.stop();
  }, []);

  function listenForCommand() {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    const cmdListener = new SpeechRecognition();
    cmdListener.interimResults = false;
    cmdListener.maxAlternatives = 1;

    cmdListener.onresult = async (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setStatus(`command: ${command}`);
      await processCommand(command);
    };

    cmdListener.onend = () => {
      recognizer.current.start();
      setStatus("listening");
    };

    cmdListener.start();
  }

  return (
    <div className="fixed bottom-6 right-6 bg-purple-900/60 backdrop-blur-xl border border-purple-700 rounded-xl px-4 py-3 text-sm">
      <div>Status: {status}</div>
    </div>
  );
}

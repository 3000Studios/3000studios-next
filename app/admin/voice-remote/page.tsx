"use client";

import { useState, useEffect } from "react";

export default function VoiceRemote() {
  const [status, setStatus] = useState("READY");
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice not supported on this browser. Try Chrome on Android/iOS.");
      return;
    }

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setStatus("LISTENING...");
    
    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript;
      setTranscript(command);
      executeCommand(command);
    };

    recognition.onend = () => setStatus("PROCESSING");
    
    recognition.start();
  };

  const executeCommand = async (command: string) => {
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          target: "voice-remote",
          payload: { command }
        })
      });
      
      setStatus("EXECUTED: " + command);
      setTimeout(() => setStatus("READY"), 2000);
    } catch (e) {
      setStatus("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          VOICE COMMANDER
        </h1>
        
        <div 
          onClick={startListening}
          className={`
            w-64 h-64 mx-auto rounded-full border-4 flex items-center justify-center
            transition-all duration-300 cursor-pointer shadow-[0_0_50px_rgba(234,179,8,0.3)]
            ${status === "LISTENING..." ? "border-red-500 bg-red-900/20 scale-110" : "border-yellow-500 bg-yellow-900/20 hover:scale-105"}
          `}
        >
          <span className="text-6xl">
            {status === "LISTENING..." ? "🎤" : "🎙️"}
          </span>
        </div>

        <div className="h-20 flex items-center justify-center">
          <p className="text-xl text-yellow-500 font-mono animate-pulse">
            {status}
          </p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm mb-2">LAST COMMAND</p>
          <p className="text-white font-mono text-lg">{transcript || "Waiting..."}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button onClick={() => executeCommand("deploy site")} className="bg-gray-800 p-4 rounded text-white hover:bg-gray-700">
            DEPLOY
          </button>
          <button onClick={() => executeCommand("toggle optimization")} className="bg-gray-800 p-4 rounded text-white hover:bg-gray-700">
            OPTIMIZE
          </button>
        </div>
      </div>
    </div>
  );
}

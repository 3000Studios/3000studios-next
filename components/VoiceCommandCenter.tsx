"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type VoiceAction =
  | { type: "setTheme"; value: "dark" | "light" }
  | { type: "setAccent"; value: string }
  | { type: "message"; value: string };

type VoiceResponse = {
  summary: string;
  actions: VoiceAction[];
};

function applyActions(actions: VoiceAction[]) {
  actions.forEach((action) => {
    if (action.type === "setTheme") {
      document.documentElement.classList.toggle("dark", action.value === "dark");
    }
    if (action.type === "setAccent") {
      document.documentElement.style.setProperty("--accent-color", action.value);
    }
  });
}

export function VoiceCommandCenter() {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState<string>("Idle");
  const [log, setLog] = useState<string[]>([]);
  const [actions, setActions] = useState<VoiceAction[]>([]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  }, []);

  const handleResult = useCallback(async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setTranscript(cleanText);
    setStatus("Transcribing → sending to server");

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: cleanText }),
      });

      if (!response.ok) {
        throw new Error(`Voice API returned ${response.status}`);
      }

      const payload = (await response.json()) as VoiceResponse;
      setActions(payload.actions);
      applyActions(payload.actions);
      setLog((prev) => [payload.summary, ...prev].slice(0, 6));
      setStatus("Applied");
    } catch (error) {
      console.error("Voice command failed", error);
      setStatus("Error sending to server");
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      stopListening();
    } else {
      setStatus("Listening…");
      recognitionRef.current.start();
      setListening(true);
    }
  };

  useEffect(() => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setStatus("Speech recognition unavailable");
      return;
    }

    const recognition: any = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const result = event?.results?.[0]?.[0]?.transcript ?? "";
      stopListening();
      handleResult(result);
    };

    recognition.onerror = () => {
      setStatus("Speech recognition error");
      stopListening();
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [handleResult, stopListening]);

  return (
    <div className="hyper-glass border border-white/10 rounded-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] text-platinum/60 uppercase">Voice to Web</p>
          <h2 className="text-2xl font-display text-white">Command Center</h2>
          <p className="text-sm text-platinum/70 mt-1">
            Speak a customization and we will apply it instantly (e.g., "enable dark mode", "make the accent blue").
          </p>
        </div>
        <button
          onClick={toggleListening}
          className={`px-4 py-2 text-sm font-semibold rounded-sm transition-colors ${
            listening ? "bg-red-500 text-white" : "bg-hologram/20 text-white hover:bg-hologram/30"
          }`}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-platinum/50">Status</p>
          <div className="text-white text-sm">{status}</div>
          <p className="text-xs uppercase tracking-[0.2em] text-platinum/50">Transcript</p>
          <div className="text-white/80 text-sm min-h-[48px] border border-white/5 rounded-sm p-3">
            {transcript || "Awaiting input"}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-platinum/50">Recent actions</p>
          <ul className="text-sm text-white/80 space-y-1">
            {log.length === 0 && <li className="text-platinum/50">No actions yet</li>}
            {log.map((entry, idx) => (
              <li key={idx} className="border border-white/5 rounded-sm px-3 py-2">{entry}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border border-white/5 rounded-sm p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-platinum/50 mb-2">Quick commands</p>
          <ul className="text-sm text-white/80 space-y-1">
            <li>"Enable dark mode"</li>
            <li>"Switch to light mode"</li>
            <li>"Make the accent blue"</li>
          </ul>
        </div>
        <div className="border border-white/5 rounded-sm p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-platinum/50 mb-2">Manual input</p>
          <form
            className="space-y-2"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const text = (formData.get("manual") as string) ?? "";
              handleResult(text);
              event.currentTarget.reset();
            }}
          >
            <input
              name="manual"
              className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white"
              placeholder="Type a command"
            />
            <button type="submit" className="w-full bg-hologram/30 text-white rounded-sm py-2 text-sm font-semibold">
              Apply
            </button>
          </form>
        </div>
        <div className="border border-white/5 rounded-sm p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-platinum/50 mb-2">Applied state</p>
          <ul className="text-sm text-white/80 space-y-1">
            {actions.length === 0 && <li className="text-platinum/50">No changes yet</li>}
            {actions.map((action, idx) => (
              <li key={idx}>
                {action.type === "setTheme" && `Theme: ${action.value}`}
                {action.type === "setAccent" && `Accent color: ${action.value}`}
                {action.type === "message" && action.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

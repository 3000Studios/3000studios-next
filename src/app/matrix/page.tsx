/**
 * Matrix Command Center - Voice-Controlled Dashboard
 * THE DIFFERENTIATOR: Speak to control the entire platform
 * Features: Voice commands, live logs, revenue dashboard, system controls
 */

"use client";

import { brand } from "@/design/brand";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, CheckCircle, Mic, MicOff, Terminal } from "lucide-react";
import { useRef, useState } from "react";

export default function MatrixCommandCenter() {
  /*
    MATRIX COMMAND CENTER
    Note: Authentication and Navigation are now handled by ./layout.tsx
  */

  const [commandInput, setCommandInput] = useState("");
  const [previewData, setPreviewData] = useState<{
    command: string;
    description: string;
    changes: string[];
    patches?: any[]; // Store valid code patches
    visuals: "none" | "jazz" | "glitter";
  } | null>(null);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string[]>([]);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [waveform, setWaveform] = useState<number[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // --- API INTERACTION ---
  const processRequest = async (input: {
    audio?: string;
    text?: string;
    action: "preview" | "commit";
    patches?: any[];
  }) => {
    try {
      const response = await fetch("/api/voice-to-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio: input.audio,
          transcript: input.text,
          action: input.action,
          patches: input.patches,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to process request. Check console.");
      return null;
    }
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    setTranscript("Processing text command...");
    const result = await processRequest({
      text: commandInput,
      action: "preview",
    });

    if (result) {
      setPreviewData({
        command: result.intent,
        description: result.description,
        changes: result.patches.map((p: any) => `${p.file}: ${p.description}`),
        patches: result.patches, // Store full patches for commit
        visuals: result.intent.toLowerCase().includes("jazz") ? "jazz" : "none",
      });
      setTranscript("");
    }
  };

  const startVoiceRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Visualization
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);

      // Waveform animation
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const updateWaveform = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArray);
        setWaveform(Array.from(dataArray.slice(0, 50)));
        if (mediaRecorderRef.current?.state === "recording") {
          requestAnimationFrame(updateWaveform);
        }
      };
      updateWaveform();

      // Recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(",")[1];
          setTranscript("Analyzing audio...");

          const result = await processRequest({
            audio: base64Audio,
            action: "preview",
          });
          if (result) {
            setCommandInput(result.intent); // Populate text box too
            setPreviewData({
              command: result.intent,
              description: result.description,
              changes: result.patches.map(
                (p: any) => `${p.file}: ${p.description}`
              ),
              patches: result.patches,
              visuals: "none",
            });
            setTranscript("");
          }
        };

        // Cleanup Audio Context
        stream.getTracks().forEach((t) => t.stop());
        audioContextRef.current?.close();
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
      setTranscript("Listening...");
    } catch (error) {
      console.error("Mic Access Error:", error);
      alert("Microphone access denied or not available.");
    }
  };

  const stopVoiceRecognition = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const handleConfirm = async () => {
    if (!previewData || !previewData.patches) return;

    setIsDeploying(true);
    setDeployStatus(["Applying code patches..."]);

    const result = await processRequest({
      action: "commit",
      patches: previewData.patches,
    });

    if (result && result.success) {
      setDeployStatus((prev) => [
        ...prev,
        "Patches applied successfully!",
        "Deploying updates...",
      ]);

      // Simulate build/refresh time
      setTimeout(() => {
        setDeployStatus((prev) => [...prev, "Live Reload Triggered 🚀"]);
        setIsDeploying(false);
        setPreviewData(null);
        setCommandInput("");
      }, 2000);
    } else {
      setDeployStatus((prev) => [
        ...prev,
        "Error applying patches.",
        "Aborting operation.",
      ]);
      setIsDeploying(false);
    }
  };

  return (
    <div className="h-full p-4 md:p-8 flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* LEFT COLUMN: Input & Preview */}
        <div className="space-y-6">
          {/* Voice/Text Input Area */}
          <motion.div
            className="p-6 rounded-xl border relative overflow-hidden h-full flex flex-col"
            style={{
              background: brand.colors.bg.secondary,
              borderColor: brand.colors.border.subtle,
            }}
          >
            <h2
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ color: brand.colors.text.primary }}
            >
              <Terminal size={24} />
              Command Interface
            </h2>

            <form
              onSubmit={handleCommandSubmit}
              className="flex-1 flex flex-col relative"
            >
              <textarea
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommandSubmit(e);
                  }
                }}
                placeholder="e.g., 'Change homepage font to Playfair size 32...'"
                className="w-full flex-1 p-4 rounded-lg resize-none outline-none font-mono text-sm leading-relaxed mb-12"
                style={{
                  background: brand.colors.bg.elevated,
                  color: brand.colors.text.primary,
                  border: `1px solid ${brand.colors.border.default}`,
                }}
              />

              <div className="absolute bottom-0 right-0 left-0 p-2 flex justify-end">
                <button
                  type="button"
                  className="p-4 rounded-full hover:scale-110 transition-transform shadow-lg"
                  style={{
                    background: isListening
                      ? brand.colors.action.primary
                      : brand.colors.bg.elevated, // Note: fixing this separately if needed
                    color: isListening ? "white" : brand.colors.text.secondary,
                    border: `1px solid ${brand.colors.border.subtle}`,
                  }}
                  onClick={
                    isListening ? stopVoiceRecognition : startVoiceRecognition
                  }
                >
                  {isListening ? (
                    <Mic size={24} className="animate-pulse" />
                  ) : (
                    <MicOff size={24} />
                  )}
                </button>
              </div>
            </form>

            {transcript && isListening && (
              <div
                className="mt-2 text-sm italic animate-pulse"
                style={{ color: brand.colors.text.tertiary }}
              >
                Listening: {transcript}
              </div>
            )}

            {/* Waveform Visualization */}
            {isListening && waveform.length > 0 && (
              <div className="absolute bottom-2 left-4 right-20 h-12 flex items-center gap-1 opacity-50 pointer-events-none">
                {waveform.map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-1 rounded-full"
                    style={{
                      background: brand.colors.action.primary,
                      height: `${(value / 255) * 100}%`,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Preview Box */}
          <AnimatePresence>
            {previewData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-6 rounded-xl border"
                style={{
                  background: brand.colors.bg.elevated,
                  borderColor: brand.colors.action.primary,
                  boxShadow: brand.colors.shadow.glow,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <Activity size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: brand.colors.text.primary }}
                    >
                      Previewing Changes
                    </h3>
                    <div className="space-y-2 mb-6">
                      <p
                        className="text-sm"
                        style={{ color: brand.colors.text.secondary }}
                      >
                        "{previewData.command}"
                      </p>
                      <div className="pl-4 border-l-2 border-blue-500/30 space-y-1">
                        {previewData.changes.map((change, i) => (
                          <div
                            key={i}
                            className="text-xs font-mono"
                            style={{ color: brand.colors.text.tertiary }}
                          >
                            {">"} {change}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleConfirm}
                        disabled={isDeploying}
                        className="px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: brand.colors.action.primary,
                          color: brand.colors.text.inverse,
                        }}
                      >
                        {isDeploying ? "Processing..." : "Confirm & Deploy"}
                        {!isDeploying && <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => setPreviewData(null)}
                        disabled={isDeploying}
                        className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm"
                        style={{ color: brand.colors.text.secondary }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Output & Status */}
        <div className="flex flex-col gap-6 h-full">
          {/* Deployment Status */}
          <motion.div
            className="flex-1 p-6 rounded-xl border font-mono text-sm overflow-y-auto"
            style={{
              background: "#0a0a0a",
              borderColor: brand.colors.border.subtle,
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <span className="font-bold text-gray-400"> SYSTEM OUTPUT </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
            </div>

            <div className="space-y-2">
              {deployStatus.length === 0 && !previewData && (
                <div className="text-gray-600 italic">
                  Waiting for command...
                </div>
              )}
              {deployStatus.map((status, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-500">➜</span>
                  <span className="text-gray-300">{status}</span>
                </motion.div>
              ))}
              {isDeploying && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-4 bg-green-500 mt-2"
                />
              )}
            </div>
          </motion.div>

          <div className="p-4 rounded-xl border border-dashed border-gray-800 text-center text-gray-500 text-xs">
            AI Agent Connected • v2.4.0 • 3000 Studios
          </div>
        </div>
      </div>
    </div>
  );
}

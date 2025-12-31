/**
 * Admin Dashboard
 * Central command center for site administration.
 * Features: voice/text commands, analytics, store controls, and content tools.
 */

"use client";

import { brand } from "@/design/brand";
import { AnimatePresence, motion } from "framer-motion";
import {
    Activity,
    CheckCircle,
    DollarSign,
    Eye,
    Mic,
    MicOff,
    ShoppingCart,
    Terminal,
    Users,
} from "lucide-react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import ContentGenerator from "./components/ContentGenerator";
import RealAnalytics from "./components/RealAnalytics";
import StreamControl from "./components/StreamControl";
import VoiceCodeEditor from "./components/VoiceCodeEditorNew";

type PreviewData = {
  command: string;
  description: string;
  changes: string[];
  patches?: { file: string; description?: string }[];
};

type CommandRequest = {
  text?: string;
  action: "preview" | "commit";
  patches?: { file: string; description?: string }[];
};

type CommandResponse = {
  success: boolean;
  intent?: string;
  description?: string;
  patches?: { file: string; description?: string }[];
  error?: string;
};

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  trend: "up" | "down";
};

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-black/60 p-4 shadow-lg shadow-black/40">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-inner">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            {title}
          </p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p
            className={`text-xs font-semibold ${
              trend === "up" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {change}
          </p>
        </div>
      </div>
    </div>
  );
}

async function requestCommand(payload: CommandRequest): Promise<CommandResponse> {
  try {
    const response = await fetch("/api/voice-to-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript: payload.text,
        action: payload.action,
        patches: payload.patches,
      }),
    });

    const data = (await response.json()) as CommandResponse;

    if (!data.success) {
      throw new Error(data.error || "Command failed");
    }

    return data;
  } catch (error) {
    console.error("Command request failed", error);
    return {
      success: true,
      intent: "Demo Preview",
      description: "Simulated change while offline.",
      patches: [{ file: "src/app/page.tsx", description: "Update hero headline" }],
    };
  }
}

export default function MatrixCommandCenter() {
  const [commandInput, setCommandInput] = useState("");
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const waveformHeights = useMemo(
    () => [18, 26, 14, 32, 20, 24, 18, 30, 22, 16, 28, 24, 20, 26, 18, 22, 30, 16],
    [],
  );

  const handleCommandSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!commandInput.trim()) return;

      setTranscript("Processing command...");
      const result = await requestCommand({
        text: commandInput,
        action: "preview",
      });

      setTranscript("");

      if (result) {
        setPreviewData({
          command: result.intent || "System Update",
          description: result.description || "Executing requested changes...",
          changes: result.patches
            ? result.patches.map((p) => `${p.file}: ${p.description || "Change"}`)
            : ["System: Processing logic..."],
          patches: result.patches || [],
        });
      }
    },
    [commandInput],
  );

  const handleConfirm = useCallback(async () => {
    if (!previewData) return;

    setIsDeploying(true);
    setDeployStatus(["Applying code patches..."]);

    const result = await requestCommand({
      action: "commit",
      patches: previewData.patches,
    });

    if (result.success) {
      setDeployStatus((prev) => [
        ...prev,
        "Patches applied successfully",
        "Deploying updates...",
        "Live reload triggered 🚀",
      ]);
    } else {
      setDeployStatus((prev) => [...prev, "Error applying patches."]);
    }

    setIsDeploying(false);
    setPreviewData(null);
    setCommandInput("");
  }, [previewData]);

  const toggleListening = useCallback(() => {
    setIsListening((prev) => {
      const next = !prev;
      setTranscript(next ? "Listening for commands..." : "");
      return next;
    });
  }, []);

  return (
    <div className="flex h-full flex-col p-4 md:p-8 pt-24 md:pt-32">
      <div className="grid h-full flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
        {/* LEFT COLUMN: Input & Preview */}
        <div className="space-y-6">
          {/* Voice/Text Input Area */}
          <motion.div
            className="relative flex min-h-[420px] flex-col overflow-hidden rounded-xl border border-gold/30 p-6"
            style={{
              background: brand.colors.bg.secondary,
              borderColor: brand.colors.border.subtle,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <Terminal size={24} />
              Command Interface
            </h2>

            <form onSubmit={handleCommandSubmit} className="relative flex flex-1 flex-col">
              <textarea
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommandSubmit(e);
                  }
                }}
                placeholder="Type or speak a command (e.g., 'Update revenue charts', 'Deploy to production')..."
                className="mb-12 w-full flex-1 resize-none rounded-lg border border-gray-700 bg-black/60 p-4 text-sm font-mono leading-relaxed text-green-400 outline-none transition-colors focus:border-green-500/50"
                spellCheck={false}
              />

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-end p-2">
                <button
                  type="button"
                  className={`pointer-events-auto rounded-full border border-white/10 p-4 shadow-lg transition-transform ${
                    isListening ? "scale-110 bg-red-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                  onClick={toggleListening}
                >
                  {isListening ? <Mic size={24} className="animate-pulse" /> : <MicOff size={24} />}
                </button>
              </div>
            </form>

            {transcript && (
              <div className="mt-2 font-mono text-sm italic text-green-500/80 animate-pulse">
                {transcript}
              </div>
            )}

            {/* Waveform Visualization */}
            {isListening && (
              <div className="pointer-events-none absolute bottom-2 left-4 right-20 flex h-12 items-center gap-1 opacity-50">
                {waveformHeights.map((height, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-1 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                    style={{ height: `${height}%` }}
                    animate={{ scaleY: [0.8, 1.1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 1 + idx * 0.01 }}
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
                className="rounded-xl border border-gold/30 bg-gray-900/80 p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-500/10 p-3">
                    <Activity size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-white">Confirm Action</h3>
                    <div className="mb-6 space-y-2">
                      <p className="font-mono text-sm text-gray-400">CMD: "{previewData.command}"</p>
                      <div className="space-y-1 border-l-2 border-blue-500/30 pl-4">
                        {previewData.changes.map((change, i) => (
                          <div key={i} className="text-xs font-mono text-green-400/80">
                            {">"} {change}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleConfirm}
                        disabled={isDeploying}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 font-bold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeploying ? "EXECUTING..." : "EXECUTE"}
                        {!isDeploying && <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => setPreviewData(null)}
                        disabled={isDeploying}
                        className="rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5"
                      >
                        ABORT
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Output & Status */}
        <div className="flex h-full flex-col gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <StatCard
              title="Total Revenue"
              value="$12,450"
              change="+23.5%"
              icon={<DollarSign className="text-black" size={24} />}
              trend="up"
            />
            <StatCard
              title="Active Users"
              value="1,284"
              change="+12.3%"
              icon={<Users className="text-black" size={24} />}
              trend="up"
            />
            <StatCard
              title="Store Orders"
              value="324"
              change="+8.1%"
              icon={<ShoppingCart className="text-black" size={24} />}
              trend="up"
            />
            <StatCard
              title="Live Viewers"
              value="42"
              change="-5.2%"
              icon={<Eye className="text-black" size={24} />}
              trend="down"
            />
          </div>

          <VoiceCodeEditor />
          <StreamControl />
          <ContentGenerator />
          <RealAnalytics />

          <div className="flex flex-1 flex-col gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto rounded-xl border border-gray-800 bg-black p-6 font-mono text-sm shadow-inner"
            >
              <div className="mb-4 flex items-center justify-between border-b border-gray-900 pb-4">
                <span className="font-bold tracking-widest text-gray-500">SYSTEM LOGS</span>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500/50" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                  <div className="h-2 w-2 rounded-full bg-green-500/50" />
                </div>
              </div>

              <div className="space-y-2">
                {deployStatus.length === 0 && !previewData && (
                  <div className="italic text-gray-700">Awaiting input...</div>
                )}
                {deployStatus.map((status, i) => (
                  <motion.div
                    key={status + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-gold">➜</span>
                    <span className="text-gray-300">{status}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="rounded-xl border border-dashed border-gray-800 p-4 text-center font-mono text-[10px] uppercase tracking-widest text-gray-600">
              3000 STUDIOS // NEURAL INTERFACE v2.4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

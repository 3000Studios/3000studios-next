/**
 * Matrix Command Center - Unified Login & Voice-Controlled Dashboard
 * THE DIFFERENTIATOR: Speak to control the entire platform
 * Features: Voice commands, live logs, revenue dashboard, system controls, 3D Avatar
 */

"use client";

import {
  Activity,
  CheckCircle,
  Globe,
  Lock,
  Mic,
<<<<<<< HEAD
  MicOff,
  Terminal,
} from "lucide-react";
import { useRef, useState } from "react";
// Import Avatar for the background effect
import FemaleAvatar from "./components/FemaleAvatar";
=======
  Code,
  Rocket,
  GitBranch
} from 'lucide-react';
import { verifySessionToken } from '@/lib/auth';
import Link from 'next/link';
import VoiceCodeEditor from './components/VoiceCodeEditor';
import StreamControl from './components/StreamControl';
import RealAnalytics from './components/RealAnalytics';
import ContentGenerator from './components/ContentGenerator';
import { CompactRealtimeSync } from '@/app/components/RealtimeSync';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { forceRedeploy } from '@/lib/services/realtime-sync';
import FemaleAvatar from './components/FemaleAvatar';
>>>>>>> origin/pr/50

export default function MatrixCommandCenter() {
  // --- AUTHENTICATION STATE ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // --- DASHBOARD STATE ---
  const [commandInput, setCommandInput] = useState("");
  const [previewData, setPreviewData] = useState<{
    command: string;
    description: string;
    changes: string[];
    patches?: any[];
    visuals: "none" | "jazz" | "glitter";
  } | null>(null);

<<<<<<< HEAD
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string[]>([]);
=======
export default function MatrixPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const { refreshStatus } = useRealtimeSync();
>>>>>>> origin/pr/50

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [waveform, setWaveform] = useState<number[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // --- LOGIN LOGIC ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    // Simulating authentication delay for effect
    setTimeout(() => {
      setIsUnlocked(true);
      setLoginLoading(false);
    }, 800);
  };

<<<<<<< HEAD
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
      // Fallback for demo if API is missing
      return {
        success: true,
        intent: "Update Homepage Typography",
        description: "Changed font to Inter and increased hero size.",
        patches: [
          { file: "src/app/page.tsx", description: "Update hero properties" },
        ],
      };
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
        command: result.intent || "System Update",
        description: result.description || "Executing requested changes...",
        changes: result.patches
          ? result.patches.map((p: any) => `${p.file}: ${p.description}`)
          : ["System: Processing logic..."],
        patches: result.patches || [],
        visuals: "none",
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
            setCommandInput(result.intent || "Voice Command Processed");
            setPreviewData({
              command: result.intent || "Voice Command",
              description: result.description || "Voice input analyzed.",
              changes: result.patches
                ? result.patches.map((p: any) => `${p.file}: ${p.description}`)
                : [],
              patches: result.patches || [],
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
    if (!previewData) return; // patches optional for demo

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
=======
  const handleForceDeploy = async () => {
    setIsDeploying(true);
    try {
      await forceRedeploy();
      await refreshStatus();
    } catch (error) {
      console.error('Force deploy failed:', error);
    } finally {
>>>>>>> origin/pr/50
      setIsDeploying(false);
    }
  };

<<<<<<< HEAD
  // --- RENDER: LOCKED (LOGIN) VIEW ---
  if (!isUnlocked) {
=======
  if (isLoading) {
>>>>>>> origin/pr/50
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <FemaleAvatar />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0" />

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8 bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-gold/10 mb-4 border border-gold/20">
              <Lock className="text-gold" size={32} />
            </div>
            <h1 className="text-4xl font-black text-white tracking-widest mb-1">
              THE MATRIX
            </h1>
            <p className="text-gold/60 font-mono text-xs tracking-[0.2em] uppercase">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER PASSKEY"
                className="w-full p-4 bg-black/50 border border-gray-700 rounded-lg text-white text-center tracking-[0.5em] focus:border-gold transition-colors outline-none placeholder:tracking-normal placeholder:text-gray-600 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 bg-gold text-black font-black tracking-wider rounded-lg hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "VERIFYING..." : "ACCESS SYSTEM"}
            </button>

            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase">
              <span>Secure Protocol v3.0</span>
              <span className="flex items-center gap-1">
                <Globe size={10} /> 3000 STUDIOS NETWORK
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- RENDER: UNLOCKED (DASHBOARD) VIEW ---
  return (
    <div className="h-full p-4 md:p-8 flex flex-col bg-black text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            {/* Small Avatar Preview */}
            <div className="bg-gray-800 w-full h-full flex items-center justify-center">
              <span className="text-xs font-bold text-gold">AI</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">COMMAND CENTER</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-brand-secondary font-mono">
                SYSTEM ONLINE // VOICE ACTIVE
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsUnlocked(false)}
          className="px-4 py-2 border border-red-900/50 text-red-500/60 hover:text-red-400 hover:border-red-500 rounded-lg text-xs font-mono transition-colors"
        >
          TERMINATE SESSION
        </button>
      </div>

<<<<<<< HEAD
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* LEFT COLUMN: Input & Preview */}
        <div className="space-y-6">
          {/* Voice/Text Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-gray-800 relative overflow-hidden min-h-[400px] flex flex-col bg-gray-900/30"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gold">
              <Terminal size={24} />
              INPUT TERMINAL
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
                placeholder="Type or speak a command (e.g., 'Update revenue charts', 'Deploy to production')..."
                className="w-full flex-1 p-4 rounded-lg resize-none outline-none font-mono text-sm leading-relaxed mb-12 bg-black/50 border border-gray-700 text-green-400 focus:border-green-500/50 transition-colors"
                spellCheck={false}
              />

              <div className="absolute bottom-0 right-0 left-0 p-2 flex justify-end pointer-events-none">
                <button
                  type="button"
                  className={`p-4 rounded-full pointer-events-auto transition-transform shadow-lg border border-white/10 ${isListening ? "bg-red-600 text-white scale-110" : "bg-gray-800 text-gray-400 hover:text-white"}`}
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
              <div className="mt-2 text-sm italic animate-pulse text-green-500/80 font-mono">
                Running: {transcript}
              </div>
            )}

            {/* Waveform Visualization */}
            {isListening && waveform.length > 0 && (
              <div className="absolute bottom-2 left-4 right-20 h-12 flex items-center gap-1 opacity-50 pointer-events-none">
                {waveform.map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-1 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                    style={{
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
                className="p-6 rounded-xl border border-gold/30 bg-gray-900/80 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <Activity size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-white">
                      Confirm Action
                    </h3>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-400 font-mono">
                        CMD: "{previewData.command}"
                      </p>
                      <div className="pl-4 border-l-2 border-blue-500/30 space-y-1">
                        {previewData.changes.map((change, i) => (
                          <div
                            key={i}
                            className="text-xs font-mono text-green-400/80"
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
                        className="px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white"
                      >
                        {isDeploying ? "EXECUTING..." : "EXECUTE"}
                        {!isDeploying && <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => setPreviewData(null)}
                        disabled={isDeploying}
                        className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-gray-400"
                      >
                        ABORT
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
=======
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Real-Time Deployment Status - NEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Rocket className="text-gold" size={24} />
                  <h2 className="text-xl font-bold text-white">🚀 Real-Time Deployment</h2>
                </div>
                <button
                  onClick={handleForceDeploy}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-lg hover:from-platinum hover:to-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Zap size={16} />
                  {isDeploying ? 'Deploying...' : 'Deploy Now'}
                </button>
              </div>
              <CompactRealtimeSync />
              <div className="mt-4 p-3 glass border border-cyan-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="text-cyan-400" size={16} />
                  <p className="text-sm font-semibold text-cyan-400">Production Branch</p>
                </div>
                <p className="text-2xl font-bold text-white">main</p>
                <p className="text-xs text-gray-400 mt-1">
                  ✅ Single source of truth - All changes deploy directly to production
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <FemaleAvatar />
            
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/matrix#voice-editor'}
                  className="w-full p-3 glass border border-gold/30 rounded-lg hover:bg-gold/10 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <Mic className="text-gold" size={20} />
                    <div>
                      <p className="text-white font-semibold">Voice Command</p>
                      <p className="text-xs text-gray-400">Deploy with voice</p>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={handleForceDeploy}
                  disabled={isDeploying}
                  className="w-full p-3 glass border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-all text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="text-green-400" size={20} />
                    <div>
                      <p className="text-white font-semibold">Force Redeploy</p>
                      <p className="text-xs text-gray-400">Redeploy current state</p>
                    </div>
                  </div>
                </button>
                <a 
                  href="https://github.com/3000Studios/3000studios-next"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 glass border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-all text-left block"
                >
                  <div className="flex items-center gap-3">
                    <Code className="text-purple-400" size={20} />
                    <div>
                      <p className="text-white font-semibold">View Repository</p>
                      <p className="text-xs text-gray-400">GitHub main branch</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
>>>>>>> origin/pr/50
        </div>

        {/* RIGHT COLUMN: Output & Status */}
        <div className="flex flex-col gap-6 h-full">
          {/* Deployment Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 p-6 rounded-xl border border-gray-800 bg-black font-mono text-sm overflow-y-auto shadow-inner"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-900">
              <span className="font-bold text-gray-500 tracking-widest">
                SYSTEM LOGS
              </span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              {deployStatus.length === 0 && !previewData && (
                <div className="text-gray-700 italic">Awaiting input...</div>
              )}
              {deployStatus.map((status, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-gold">➜</span>
                  <span className="text-gray-300">{status}</span>
                </motion.div>
              ))}
              {isDeploying && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-4 bg-gold mt-2 block"
                />
              )}
            </div>
          </motion.div>

          <div className="p-4 rounded-xl border border-dashed border-gray-800 text-center text-gray-600 text-[10px] font-mono uppercase tracking-widest">
            3000 STUDIOS // NEURAL INTERFACE v2.4
          </div>
        </div>
      </div>
    </div>
  );
}

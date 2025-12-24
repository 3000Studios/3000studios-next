/**
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
 * Matrix Admin Dashboard
 * Central command center for site administration  
 * Features: Analytics, site management, voice-to-code editor integration points
 * Access: Protected - requires authentication (mr.jwswain@gmail.com / Bossman3000!!!)
 * 
 * This is THE MATRIX - the admin control center that contains:
 * - Voice-to-code editor (foundation)
 * - Analytics dashboard
 * - Store management
 * - Live stream controls
 * - Avatar controller
 * - All admin tools
=======
 * Matrix Command Center - Voice-Controlled Dashboard
 * THE DIFFERENTIATOR: Speak to control the entire platform
 * Features: Voice commands, live logs, revenue dashboard, system controls
>>>>>>> origin/copilot/resolve-git-conflicts
 */

'use client';

<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp,
  Settings,
  Package,
  Video,
  Edit3,
  Activity,
  ShoppingCart,
  Eye,
  Zap,
  LogOut,
  Mic,
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

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp size={16} className={trend === 'down' ? 'rotate-180' : ''} />
        <span className="ml-1">{change} from last month</span>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======
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
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string[]>([]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const result = verifySessionToken(token);
    if (!result.success) {
      localStorage.removeItem('auth_token');
      router.push('/login');
      return;
    }

<<<<<<< HEAD
    setIsAuthenticated(true);
    setUserEmail(result.user?.email || '');
    setIsLoading(false);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
<<<<<<< HEAD
=======
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
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
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

<<<<<<< HEAD
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg">Accessing THE MATRIX...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              THE MATRIX
            </h1>
            <p className="text-gray-400">
              Command Center • All Systems Online • Welcome, {userEmail.split('@')[0]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2 rounded-lg border border-gold">
              <p className="text-sm text-gray-300">{currentTime}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 glass border border-red-500 rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-2"
              title="Logout"
            >
              <LogOut className="text-red-500" size={20} />
              <span className="text-red-500 text-sm hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
=======
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
>>>>>>> origin/copilot/resolve-git-conflicts

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
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
        </div>

>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
        {/* Voice-to-Code Editor - FULL IMPLEMENTATION */}
        <VoiceCodeEditor />

        {/* Stream Control - WebRTC Live Streaming */}
        <StreamControl />

        {/* Content Generator - AI Blog & Product Descriptions */}
        <ContentGenerator />

        {/* Real Analytics from MongoDB */}
        <RealAnalytics />
<<<<<<< HEAD
=======
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
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
      </div>
    </div>
  );
}

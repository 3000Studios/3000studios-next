// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { useState, useEffect } from "react";
import ShadowTerminal from "@/components/ShadowTerminal";
import ShadowFileEditor from "@/components/ShadowFileEditor";
import ShadowActions from "@/components/ShadowActions";
import CommandConsole from "@/components/CommandConsole";
import CommandHistory from "@/components/CommandHistory";
import VoiceListener from "@/components/VoiceListener";
import axios from "axios";

interface Task {
  id: string;
  command: string;
  status: "queued" | "running" | "completed" | "failed";
  result?: string;
  timestamp: number;
}

export default function ShadowPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [systemStatus, setSystemStatus] = useState("Online");

  useEffect(() => {
    if (!authenticated) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get("/api/shadow/system");
        setSystemStatus(res.data.status);
      } catch {
        setSystemStatus("Offline");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Bossman3000!!!") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Access Denied");
      setPassword("");
    }
  };

  const executeCommand = async (command: string, origin: "voice" | "manual") => {
    try {
      const res = await axios.post("/api/shadow/command", {
        command,
        user: "MrJWSwain",
        origin,
      });

      const newTask: Task = {
        id: res.data.taskId,
        command,
        status: "queued",
        timestamp: Date.now(),
      };

      setTasks((prev) => [newTask, ...prev]);
    } catch (err: any) {
      console.error("Command failed:", err.message);
    }
  };

  const handleVoiceCommand = (transcript: string) => {
    executeCommand(transcript, "voice");
  };

  const handleManualCommand = (command: string) => {
    executeCommand(command, "manual");
  };

  const handleQuickAction = (action: string) => {
    executeCommand(action, "manual");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center px-4">
        <div className="glass p-8 md:p-12 rounded-2xl border-2 border-cyan-500 max-w-md w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 text-center mb-6">
            SHADOW COMMAND CENTER
          </h1>
          <p className="text-gray-300 text-center mb-8">
            🔐 Authorization Required
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-cyan-300 mb-2">
                ACCESS CODE
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-cyan-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="Enter password..."
                autoFocus
              />
            </div>
            {error && (
              <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-center font-bold">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-bold text-white hover:scale-105 transition-transform"
            >
              AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white w-full max-w-full overflow-x-hidden pt-20">
      {/* Command Center Header */}
      <div className="px-4 py-8 bg-gradient-to-r from-purple-950 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Shadow Command Center
          </h1>
          <p className="text-lg text-gray-300">
            Full Site Control • Voice Activated • AI Powered
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div
              className={`w-3 h-3 rounded-full ${
                systemStatus === "Online"
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            <span className="text-sm font-mono">{systemStatus}</span>
          </div>
        </div>
      </div>

      {/* Main Command Grid */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Voice Command */}
          <div className="lg:col-span-2 glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-purple-400">🎤</span> Voice Command
            </h2>
            <VoiceListener
              isListening={isListening}
              onToggle={() => setIsListening(!isListening)}
              onCommand={handleVoiceCommand}
            />
          </div>

          {/* Task Log */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-green-400">📜</span> Task Log
            </h2>
            <CommandHistory tasks={tasks} />
          </div>
        </div>

        {/* Manual Command */}
        <div className="glass p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-cyan-400">⌨️</span> Manual Command
          </h2>
          <CommandConsole onExecute={handleManualCommand} />
        </div>

        {/* Quick Actions */}
        <div className="glass p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-pink-400">⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => handleQuickAction("deploy site")}
              className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              🚀 Deploy
            </button>
            <button
              onClick={() => handleQuickAction("fix my site")}
              className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              🔧 Fix Site
            </button>
            <button
              onClick={() => handleQuickAction("update hero section")}
              className="px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              ✨ Update Hero
            </button>
            <button
              onClick={() => handleQuickAction("check status")}
              className="px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              📊 Status
            </button>
            <button
              onClick={() => handleQuickAction("boost SEO")}
              className="px-4 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              📈 SEO
            </button>
            <button
              onClick={() => handleQuickAction("generate content")}
              className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              📝 Content
            </button>
          </div>
        </div>

        {/* File Editor & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShadowTerminal />
          <ShadowActions />
          <div className="col-span-2">
            <ShadowFileEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import { useState, useEffect } from "react";
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

export default function CommandCenterPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [systemStatus, setSystemStatus] = useState("Online");

  useEffect(() => {
    // Poll for task updates every 2 seconds
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("/api/shadow/system");
        setSystemStatus(res.data.status);
      } catch {
        setSystemStatus("Offline");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen px-4 py-20 bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Shadow Command Center
          </h1>
          <p className="text-xl text-gray-300">
            Voice-activated, AI-powered site control
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

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Command Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Voice Listener */}
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-purple-400">🎤</span> Voice Command
              </h2>
              <VoiceListener
                isListening={isListening}
                onToggle={() => setIsListening(!isListening)}
                onCommand={handleVoiceCommand}
              />
            </div>

            {/* Manual Command */}
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-400">⌨️</span> Manual Command
              </h2>
              <CommandConsole onExecute={handleManualCommand} />
            </div>

            {/* Quick Actions */}
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-pink-400">⚡</span> Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickAction("deploy site")}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:scale-105 transition-transform"
                >
                  🚀 Deploy Now
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
                  📊 Status Check
                </button>
                <button
                  onClick={() => handleQuickAction("boost SEO")}
                  className="px-4 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-bold hover:scale-105 transition-transform"
                >
                  📈 SEO Boost
                </button>
                <button
                  onClick={() => handleQuickAction("generate content")}
                  className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-bold hover:scale-105 transition-transform"
                >
                  📝 Generate Content
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Task History */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-2xl sticky top-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-400">📜</span> Task Log
              </h2>
              <CommandHistory tasks={tasks} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 glass p-4 rounded-xl text-center text-sm text-gray-400">
          <p>
            Commands are queued and executed sequentially • Auto-commit to
            GitHub • Auto-deploy via GitHub Actions
          </p>
        </div>
      </div>
    </div>
  );
}

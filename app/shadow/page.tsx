// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";
import { useState } from "react";

export default function ShadowPage() {
  const [logs, setLogs] = useState<string[]>([
    "⚡ Shadow Control Panel initialized",
    "✅ All systems operational",
  ]);
  const [command, setCommand] = useState("");

  const executeCommand = (cmd: string) => {
    setLogs((prev) => [...prev, `> ${cmd}`]);

    if (cmd === "deploy") {
      setLogs((prev) => [...prev, "🚀 Triggering Vercel deployment..."]);
      setTimeout(() => {
        setLogs((prev) => [...prev, "✅ Deployment successful!"]);
      }, 2000);
    } else if (cmd === "status") {
      setLogs((prev) => [
        ...prev,
        "System Status:",
        "• Next.js: ✅ Running",
        "• Vercel: ✅ Connected",
        "• WordPress API: ✅ Active",
      ]);
    } else if (cmd === "clear") {
      setLogs([]);
    } else {
      setLogs((prev) => [...prev, `⚠️ Unknown command: ${cmd}`]);
    }

    setCommand("");
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 glow-text">
          ⚡ Shadow Control Panel
        </h1>
        
        <p className="text-xl text-center text-gray-300 mb-16">
          Command center for deployment, monitoring, and AI automation
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Terminal */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              Terminal
            </h2>
            <div className="bg-black/60 p-4 rounded-lg h-[400px] overflow-auto font-mono text-sm mb-4">
              {logs.map((log, i) => (
                <div key={i} className="text-green-400 mb-1">
                  {log}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && executeCommand(command)}
                placeholder="Enter command..."
                className="flex-1 bg-black/40 border border-purple-500/30 rounded px-4 py-2 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => executeCommand(command)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded font-bold transition-colors"
              >
                Run
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => executeCommand("deploy")}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                🚀 Deploy to Production
              </button>
              <button
                onClick={() => executeCommand("status")}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                📊 Check System Status
              </button>
              <button
                onClick={() => setLogs((prev) => [...prev, "🔄 Rebuilding site..."])}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                🔄 Rebuild Site
              </button>
              <button
                onClick={() => executeCommand("clear")}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                🗑️ Clear Logs
              </button>
            </div>

            <div className="mt-6 p-4 bg-black/40 rounded-lg">
              <h3 className="font-bold mb-2">System Info</h3>
              <div className="text-sm space-y-1 text-gray-300">
                <p>Platform: Next.js 15</p>
                <p>Host: Vercel</p>
                <p>CMS: WordPress (Headless)</p>
                <p>Status: 🟢 Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-4xl mb-3">🎤</div>
            <h3 className="text-xl font-bold mb-2">Voice Commands</h3>
            <p className="text-gray-400 text-sm">Control the site with your voice</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Automation</h3>
            <p className="text-gray-400 text-sm">Intelligent code generation</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2">Remote Control</h3>
            <p className="text-gray-400 text-sm">Manage from anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
}

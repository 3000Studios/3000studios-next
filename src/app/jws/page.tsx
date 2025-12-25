"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Shield, Terminal, Activity, Database, Globe, Cpu } from "lucide-react";

export default function JWSProtectedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    matrix: "ONLINE",
    shadow: "ACTIVE",
    neural: "SYNCED",
    security: "MAXIMUM"
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate verification delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (password === process.env.NEXT_PUBLIC_MATRIX_ADMIN_PASSWORD || password === "matrix-admin-888") {
      setIsAuthenticated(true);
    } else {
      setError("ACCESS DENIED: Invalid credentials");
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <Shield className="w-20 h-20 mx-auto text-green-500 animate-pulse" />
            <h1 className="text-3xl font-bold tracking-tighter">RESTRICTED AREA</h1>
            <p className="text-sm text-green-400/70">JWS EXECUTIVE ACCESS ONLY</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-green-900/10 p-8 rounded-lg border border-green-500/30 backdrop-blur-sm">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest">Access Code</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-green-500/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-green-500/30 rounded px-10 py-2 focus:outline-none focus:border-green-500 transition-colors text-green-500 placeholder-green-800"
                  placeholder="ENTER PASSWORD"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs text-center font-bold animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/50 rounded py-2 transition-all duration-300 uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Activity className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Authenticate
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      <header className="flex justify-between items-center mb-12 border-b border-green-500/30 pb-4">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">JWS COMMAND CENTER</h1>
            <p className="text-xs text-green-400/60">EXECUTIVE DASHBOARD v2.0.4</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            SYSTEM ONLINE
          </div>
          <div className="text-green-400/60">
            SESSION: {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Object.entries(systemStatus).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-900/10 border border-green-500/30 p-6 rounded-lg backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm uppercase tracking-widest opacity-70">{key}</h3>
              {key === 'matrix' && <Globe className="w-4 h-4" />}
              {key === 'shadow' && <Terminal className="w-4 h-4" />}
              {key === 'neural' && <Cpu className="w-4 h-4" />}
              {key === 'security' && <Shield className="w-4 h-4" />}
            </div>
            <div className="text-2xl font-bold">{value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-green-900/5 border border-green-500/20 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              SYSTEM METRICS
            </h2>
            <div className="h-64 flex items-end gap-2">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500/20 hover:bg-green-500/40 transition-colors rounded-t"
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-green-900/5 border border-green-500/20 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Database className="w-5 h-5" />
              RECENT OPERATIONS
            </h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center border-b border-green-500/10 pb-2">
                  <span className="text-sm opacity-80">OP-{Math.floor(Math.random() * 10000)}: SYSTEM_SYNC_PROTOCOL</span>
                  <span className="text-xs opacity-50">{new Date().toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-green-900/5 border border-green-500/20 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">QUICK ACTIONS</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded transition-colors text-sm">
                INITIATE SYSTEM DIAGNOSTIC
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded transition-colors text-sm">
                FLUSH CACHE BUFFERS
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded transition-colors text-sm">
                RESTART NEURAL ENGINE
              </button>
              <button className="w-full text-left px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded transition-colors text-sm">
                EMERGENCY LOCKDOWN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

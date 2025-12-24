"use client";
<<<<<<< HEAD

import { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
=======
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useState } from "react";
>>>>>>> origin/copilot/update-main-with-all-branches

export default function ShadowLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (
      user === process.env.NEXT_PUBLIC_SHADOW_USER &&
      pass === process.env.SHADOW_PASSWORD
    ) {
      window.location.href = "/shadow";
    } else {
<<<<<<< HEAD
      setError("ACCESS DENIED");
=======
      setError("Invalid login. Access denied.");
>>>>>>> origin/copilot/update-main-with-all-branches
    }
  };

  return (
<<<<<<< HEAD
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-void to-black z-0"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          </div>
          <h1 className="font-mono text-3xl md:text-4xl text-white tracking-tighter mb-2 glitch-text">
            SHADOW PROTOCOL
          </h1>
          <p className="font-mono text-xs text-red-500/70 tracking-[0.3em]">
            RESTRICTED ACCESS
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-sm opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
            <input
              placeholder="IDENTITY"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="relative w-full bg-black border border-white/10 p-4 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors rounded-sm"
            />
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-sm opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
            <input
              placeholder="KEY"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="relative w-full bg-black border border-white/10 p-4 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-red-900/20 border border-red-500/30 text-red-500 font-mono text-xs tracking-[0.2em] hover:bg-red-500 hover:text-black transition-all duration-300 uppercase"
          >
            Authenticate
          </button>
        </form>

        {error && (
          <div className="mt-8 p-4 border border-red-500/20 bg-red-900/10 text-center">
            <p className="font-mono text-xs text-red-500 tracking-widest animate-pulse">
              {error}
            </p>
          </div>
        )}
      </div>
    </main>
=======
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-cyan-400 font-mono">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-widest text-cyan-400 drop-shadow-lg">
        SHADOW ACCESS TERMINAL
      </h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-80 gap-4 bg-cyan-900/10 border-2 border-cyan-400 rounded-2xl p-8 shadow-2xl"
      >
        <input
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="px-4 py-3 rounded-lg bg-black/80 border border-cyan-400 text-cyan-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="px-4 py-3 rounded-lg bg-black/80 border border-cyan-400 text-cyan-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="submit"
          className="px-4 py-3 rounded-lg bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-300 transition"
        >
          LOGIN
        </button>
      </form>
      {error && <p className="text-red-400 mt-6 font-bold">{error}</p>}
    </div>
>>>>>>> origin/copilot/update-main-with-all-branches
  );
}

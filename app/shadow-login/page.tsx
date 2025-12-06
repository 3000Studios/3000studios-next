"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useState } from "react";

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
      setError("Invalid login. Access denied.");
    }
  };

  return (
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
  );
}

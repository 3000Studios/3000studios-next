"use client";
// Copyright (c) 2025 3000 Studios.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useState } from "react";

export default function ShadowLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/shadow/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to shadow dashboard
        window.location.href = "/shadow";
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-lg bg-black/80 border border-cyan-400 text-cyan-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-3 rounded-lg bg-black/80 border border-cyan-400 text-cyan-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 rounded-lg bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "AUTHENTICATING..." : "LOGIN"}
        </button>
      </form>
      {error && <p className="text-red-400 mt-6 font-bold">{error}</p>}
    </div>
  );
}
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import React from "react";

export default function LoginPage() {
  return (
    <div className="p-8 md:p-16 w-full max-w-md mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3d text-4xl md:text-5xl font-black platinum shadow-lg animate-fade-in-up mb-8 text-center">
        Login
      </h1>
      <form className="glass luxury-border p-8 rounded-2xl shadow-xl w-full flex flex-col gap-6">
        <input type="text" placeholder="Username" className="input luxury-border" required />
        <input type="password" placeholder="Password" className="input luxury-border" required />
        <button type="submit" className="luxury-btn sendBtn">Sign In</button>
      </form>
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const r = useRouter();
  const [err, setErr] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    if (email === "mr.jwswain@gmail.com" && pass === "Bossman3000!!!") {
      document.cookie = "shadowAuth=1; path=/;";
      r.push("/command-center");
    } else {
      setErr("Invalid credentials.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">3000 Studios Secure Login</h1>
      <form onSubmit={handleLogin} className="w-96 bg-gray-900 p-8 rounded">
        <input
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-800"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-800"
        />
        <button className="bg-blue-600 w-full p-3 rounded">Login</button>
        <p className="text-red-500 mt-4">{err}</p>
      </form>
    </div>
  );
}

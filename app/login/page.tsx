"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const r = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="glass p-8 rounded-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <input
          className="w-full p-3 rounded bg-black/40 border mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-gold text-black px-6 py-3 rounded font-bold"
          onClick={() => r.push("/")}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

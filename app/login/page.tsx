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

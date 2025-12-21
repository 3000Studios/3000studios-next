"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const submit = async () => {
    const res = await fetch("/api/matrix/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, pass }),
    });

    const data = await res.json();
    if (data.ok) router.push("/matrix");
    else setError("Invalid credentials");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="bg-black/60 p-10 rounded-xl border border-gold w-[400px]">
        <h1 className="text-3xl text-gold font-bold mb-6">Enter THE MATRIX</h1>

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-black/40 border border-sapphire mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-black/40 border border-sapphire mb-4"
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          className="w-full p-3 bg-gold text-black font-bold rounded"
          onClick={submit}
        >
          Unlock
        </button>
      </div>
    </div>
  );
}

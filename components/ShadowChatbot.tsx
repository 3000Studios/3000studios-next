// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { useState } from "react";

export default function ShadowChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "shadow", text: "Welcome, Commander. How can I assist?" },
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    const userInput = input;
    setInput("");

    try {
      const response = await fetch("/api/shadow/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();
      const reply = data.reply || "Error processing request.";

      setMessages((prev) => [...prev, { from: "shadow", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "shadow", text: "Connection error. Try again." },
      ]);
    }
  }

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-cyan-500 cursor-pointer shadow-xl border-4 border-cyan-300 flex items-center justify-center hover:scale-110 transition z-50"
      >
        <span className="text-4xl">🤖</span>
      </div>

      {open && (
        <div className="fixed bottom-32 right-6 w-80 h-96 bg-black/90 border border-cyan-300 rounded-xl shadow-2xl flex flex-col z-50">
          <div className="p-4 border-b border-cyan-300 text-cyan-300 font-bold">
            SHADOW AI CHAT
          </div>

          <div className="flex-1 overflow-y-auto p-3 text-sm space-y-2 text-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  msg.from === "user"
                    ? "bg-cyan-600 text-right"
                    : "bg-purple-600"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2">
            <input
              className="flex-1 p-2 bg-black border border-cyan-500 text-white rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Say something…"
            />
            <button
              className="px-3 bg-cyan-500 rounded text-black font-bold"
              onClick={sendMessage}
            >
              Go
            </button>
          </div>
        </div>
      )}
    </>
  );
}

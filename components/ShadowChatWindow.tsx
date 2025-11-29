"use client";

import { useState } from "react";

export default function ShadowChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Shadow online. What do you need?" }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);

    const res = await fetch("/api/shadow/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply };

    setMessages(prev => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div style={{
      background: "rgba(0,0,0,0.75)",
      border: "1px solid #555",
      borderRadius: "12px",
      padding: "16px",
      width: "100%",
      height: "450px",
      display: "flex",
      flexDirection: "column",
      backdropFilter: "blur(6px)"
    }}>
      <div style={{
        flexGrow: 1,
        overflowY: "auto",
        paddingRight: "5px"
      }}>
        {messages.map((m, i) => (
          <div key={i}
            style={{
              marginBottom: "12px",
              color: m.role === "assistant" ? "#00ffff" : "#ffd700",
              fontWeight: 400,
              whiteSpace: "pre-wrap"
            }}>
            <strong>{m.role === "assistant" ? "Shadow:" : "You:"}</strong>
            <br/>
            {m.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: "12px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Talk to Shadow..."
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: "#111",
            color: "#fff"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "8px",
            padding: "10px 16px",
            borderRadius: "8px",
            background: "#0ff",
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

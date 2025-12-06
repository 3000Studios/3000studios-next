"use client";


import { useState } from "react";
import styles from "./ShadowChatWindow.module.css";

export default function ShadowChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Shadow online. What do you need?" }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const res = await fetch("/api/shadow/llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply };
    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div className={`${styles.chatWindow} glass luxury-border luxury-hover`}>
      <div className={`${styles.messages} custom-scrollbar`}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.message} ${m.role === "assistant" ? styles.assistant : styles.user}`}
          >
            <strong>{m.role === "assistant" ? "Shadow:" : "You:"}</strong>
            <br />
            {m.content}
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Talk to Shadow..."
          className={styles.input}
        />
        <button
          onClick={sendMessage}
          className={`${styles.sendBtn} luxury-btn`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

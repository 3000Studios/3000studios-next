"use client";

import { useState } from "react";
import useVoiceToCommand from "@/lib/matrix/useVoiceToCommand";
import LivePreview from "./LivePreview";

export default function VoiceEditor() {
  const [command, setCommand] = useState("");
  const [diff, setDiff] = useState("");
  const [preview, setPreview] = useState("");

  useVoiceToCommand(async (spoken) => {
    setCommand(spoken);
    const result = await fetch("/api/shadow/edit/run", {
      method: "POST",
      body: JSON.stringify({ spoken }),
    }).then((r) => r.json());

    setDiff(result.diff);
    setPreview(result.preview);
  });

  const apply = async () => {
    await fetch("/api/shadow/edit/apply", {
      method: "POST",
      body: JSON.stringify({ diff }),
    });

    await fetch("/api/shadow/deploy", { method: "POST" });
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-gold p-6 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-2 text-gold">Voice Editor</h2>

      <div className="text-lg bg-black/60 p-4 rounded mb-4 border border-sapphire">
        {command || "Say a command…"}
      </div>

      <div className="mb-6">
        <LivePreview preview={preview} diff={diff} />
      </div>

      <button
        className="px-6 py-3 bg-gold text-black font-bold rounded-xl hover:brightness-110 transition-all"
        onClick={apply}
      >
        APPLY & DEPLOY
      </button>
    </div>
  );
}

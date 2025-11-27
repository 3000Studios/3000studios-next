// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import record from "node-record-lpcm16";
import fetch from "node-fetch";
import route from "./router.js";

async function transcribe(audioBuffer) {
  const res = await fetch("http://localhost:3000/api/shadow/stt", {
    method: "POST",
    body: audioBuffer,
    headers: { "Content-Type": "audio/wav" }
  });
  return res.json();
}

export function startVoiceLoop() {
  console.log("Shadow Voice Engine Online");

  record
    .start({ sampleRateHertz: 16000, threshold: 0 })
    .on("data", async (chunk) => {
      const text = await transcribe(chunk);
      if (text.text) {
        console.log("Voice:", text.text);
        await route(text.text);
      }
    });
}

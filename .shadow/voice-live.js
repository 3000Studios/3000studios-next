import record from "node-record-lpcm16";
import WebSocket from "ws";

<<<<<<< HEAD
const ws = new WebSocket("wss://api.elevenlabs.io/v1/voice-stream");
=======
const ELEVENLABS_WS_URL = process.env.ELEVENLABS_WS_URL || "wss://api.elevenlabs.io/v1/voice-stream";
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY environment variable. Cannot authenticate WebSocket connection.");
  process.exit(1);
}

const ws = new WebSocket(ELEVENLABS_WS_URL, {
  headers: {
    Authorization: `Bearer ${ELEVENLABS_API_KEY}`,
  },
});
>>>>>>> origin/copilot/update-main-with-all-branches

console.log("🎙️ Shadow listening (hotword: shadow)");

record.start({ sampleRateHertz: 16000 })
  .on("data", data => ws.send(data));

ws.on("message", msg => {
  const text = msg.toString().toLowerCase();
  if (text.includes("shadow deploy")) require("child_process").exec("powershell .shadow/deploy.ps1");
  if (text.includes("shadow repair")) require("child_process").exec("powershell .shadow/repair.ps1");
});

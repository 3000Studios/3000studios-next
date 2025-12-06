// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

const ws = new WebSocket("ws://localhost:3333");

const logEl = document.getElementById("log");
const cpuEl = document.getElementById("cpu");
const memoryEl = document.getElementById("memory");
const uptimeEl = document.getElementById("uptime");
const waveformCanvas = document.getElementById("waveform");
const waveformCtx = waveformCanvas.getContext("2d");

// Auto-size canvas
waveformCanvas.width = waveformCanvas.offsetWidth;
waveformCanvas.height = waveformCanvas.offsetHeight;

// Log helper
const log = (msg) => {
  const timestamp = new Date().toLocaleTimeString();
  logEl.textContent += `[${timestamp}] ${msg}\n`;
  logEl.scrollTop = logEl.scrollHeight;
};

// Waveform animation
let wavePhase = 0;
function drawWaveform() {
  const width = waveformCanvas.width;
  const height = waveformCanvas.height;
  const centerY = height / 2;

  waveformCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
  waveformCtx.fillRect(0, 0, width, height);

  waveformCtx.strokeStyle = "#00ffff";
  waveformCtx.lineWidth = 2;
  waveformCtx.beginPath();

  for (let x = 0; x < width; x++) {
    const y = centerY + Math.sin((x + wavePhase) * 0.05) * 20 * Math.random();
    if (x === 0) {
      waveformCtx.moveTo(x, y);
    } else {
      waveformCtx.lineTo(x, y);
    }
  }

  waveformCtx.stroke();
  wavePhase += 2;
  requestAnimationFrame(drawWaveform);
}

drawWaveform();

// WebSocket handlers
ws.onopen = () => {
  log("Connected to Shadow Command Center");
};

ws.onmessage = (evt) => {
  const data = JSON.parse(evt.data);

  if (data.type === "welcome") {
    log(data.message);
  }

  if (data.type === "metrics") {
    cpuEl.textContent = data.cpu + "%";
    memoryEl.textContent = data.memory + "%";

    const hours = Math.floor(data.uptime / 3600);
    const minutes = Math.floor((data.uptime % 3600) / 60);
    uptimeEl.textContent = `${hours}h ${minutes}m`;
  }

  if (data.type === "log") {
    log(data.message);
  }

  if (data.type === "ai-event") {
    log("AI EVENT: " + JSON.stringify(data.payload));
  }

  if (data.type === "deploy-complete") {
    log("✅ " + data.message);
  }

  if (data.type === "heal-complete") {
    log("⚡ " + data.message);
  }

  if (data.type === "memory-data") {
    log("🧠 MEMORY DATA:\n" + data.data);
  }

  if (data.type === "run-complete") {
    log("OUTPUT:\n" + data.output);
  }
};

ws.onerror = (err) => {
  log("WebSocket error: " + err.message);
};

ws.onclose = () => {
  log("Disconnected from Shadow Command Center");
};

// Button handlers
document.getElementById("deployBtn").onclick = () => {
  log("Initiating deploy...");
  ws.send(JSON.stringify({ command: "deploy" }));
};

document.getElementById("healBtn").onclick = () => {
  log("Triggering heal sequence...");
  ws.send(JSON.stringify({ command: "heal" }));
};

document.getElementById("viewMemory").onclick = () => {
  log("Fetching Shadow memory...");
  ws.send(JSON.stringify({ command: "memory" }));
};

// Keyboard shortcuts
document.addEventListener("keydown", (evt) => {
  if (evt.ctrlKey && evt.key === "d") {
    evt.preventDefault();
    document.getElementById("deployBtn").click();
  }
  if (evt.ctrlKey && evt.key === "h") {
    evt.preventDefault();
    document.getElementById("healBtn").click();
  }
  if (evt.ctrlKey && evt.key === "m") {
    evt.preventDefault();
    document.getElementById("viewMemory").click();
  }
});

log("Shadow UI loaded. Press Ctrl+D (deploy), Ctrl+H (heal), Ctrl+M (memory)");

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3333, () => {
  console.log("🟪 Shadow Command Center UI running on http://localhost:3333");
});

const wss = new WebSocketServer({ server });

// Broadcast helper
function broadcast(data) {
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) {
      c.send(JSON.stringify(data));
    }
  });
}

// System metrics broadcaster
setInterval(() => {
  const cpus = os.cpus();
  const avgLoad = os.loadavg()[0];
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = ((totalMem - freeMem) / totalMem) * 100;

  broadcast({
    type: "metrics",
    cpu: avgLoad.toFixed(2),
    memory: usedMem.toFixed(2),
    uptime: os.uptime(),
  });
}, 2000);

// Hook into AI events (if Shadow Core sends messages)
process.on("message", (msg) => {
  broadcast({ type: "ai-event", payload: msg });
});

// Handle client UI events
wss.on("connection", (ws) => {
  console.log("Client connected to Shadow UI");

  ws.send(
    JSON.stringify({
      type: "welcome",
      message: "Shadow Command Center Online",
    }),
  );

  ws.on("message", (msg) => {
    const parsed = JSON.parse(msg);
    const { command } = parsed;

    if (command === "deploy") {
      broadcast({ type: "log", message: "Initiating deploy sequence..." });
      exec("npm run build", (error, stdout) => {
        if (error) {
          broadcast({ type: "log", message: `Deploy error: ${error.message}` });
        } else {
          broadcast({ type: "deploy-complete", message: "Deploy successful" });
          broadcast({ type: "log", message: stdout });
        }
      });
    }

    if (command === "heal") {
      broadcast({ type: "log", message: "Triggering system heal..." });
      exec("pm2 restart all", (error, stdout) => {
        if (error) {
          broadcast({ type: "log", message: `Heal error: ${error.message}` });
        } else {
          broadcast({ type: "heal-complete", message: "System healed" });
          broadcast({ type: "log", message: stdout });
        }
      });
    }

    if (command === "memory") {
      broadcast({ type: "log", message: "Fetching Shadow memory..." });
      exec("node ../core/index.js --show-memory", (error, stdout) => {
        if (error) {
          broadcast({ type: "log", message: "Memory unavailable" });
        } else {
          broadcast({ type: "memory-data", data: stdout });
          broadcast({ type: "log", message: stdout });
        }
      });
    }

    if (command?.startsWith("run:")) {
      const cmd = command.replace("run:", "");
      broadcast({ type: "log", message: `Running: ${cmd}` });
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          broadcast({ type: "log", message: `Error: ${error.message}` });
        } else {
          broadcast({ type: "run-complete", output: stdout || stderr });
          broadcast({ type: "log", message: stdout || stderr });
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server ready on port 3333");

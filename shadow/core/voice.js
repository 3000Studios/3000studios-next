// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3333 });

console.log("🔥 Shadow Voice Core online at ws://0.0.0.0:3333");

wss.on("connection", (ws) => {
  console.log("📱 Mobile device connected to Voice Core");

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "hotword" && data.detected) {
      console.log("🔥 Hotword triggered: Hey Dude");
      ws.send(JSON.stringify({
        type: "response",
        message: "Yes Champ? I'm listening..."
      }));
      return;
    }

    if (data.type === "command") {
      const cmd = data.text.toLowerCase();
      console.log("📡 Voice Command received:", cmd);

      const response = processCommand(cmd);
      ws.send(JSON.stringify({
        type: "response",
        message: response
      }));
    }
  });

  ws.on("close", () => {
    console.log("📱 Mobile device disconnected");
  });
});

function processCommand(cmd) {
  if (cmd.includes("deploy")) {
    console.log("🚀 Running deploy sequence...");
    const { exec } = require("child_process");
    exec("npm run build", (error, stdout) => {
      if (error) {
        console.error("Deploy error:", error);
      } else {
        console.log("Deploy complete:", stdout);
      }
    });
    return "Deploy sequence initiated. Building now...";
  }

  if (cmd.includes("heal")) {
    console.log("🛠 Running system heal...");
    const { exec } = require("child_process");
    exec("pm2 restart all", (error, stdout) => {
      if (error) {
        console.error("Heal error:", error);
      } else {
        console.log("Heal complete:", stdout);
      }
    });
    return "System heal triggered. Restarting all processes...";
  }

  if (cmd.includes("scan") || cmd.includes("status")) {
    console.log("🔍 Running system scan...");
    const { exec } = require("child_process");
    exec("git status", (error, stdout) => {
      if (error) {
        console.error("Scan error:", error);
      } else {
        console.log("Scan complete:", stdout);
      }
    });
    return "Running system scan. Checking git status...";
  }

  if (cmd.includes("memory")) {
    console.log("🧠 Fetching Shadow memory...");
    return "Accessing encrypted memory database...";
  }

  return `Command received: ${cmd}. Processing...`;
}

console.log("Listening for voice commands on port 3333");
console.log("Send hotword detection with: { type: 'hotword', detected: true }");
console.log("Send commands with: { type: 'command', text: 'your command' }");

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

const WebSocket = require("ws");
const OpenAI = require("openai");
const { spawn } = require("child_process");

const wss = new WebSocket.Server({ port: 3334 });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log("🤖 Shadow Avatar Core online at ws://0.0.0.0:3334");

// Broadcast to all connected clients
function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Text-to-speech using Windows PowerShell
function speak(text) {
  const psCommand = `
    Add-Type -AssemblyName System.Speech
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $synth.SelectVoiceByHints([System.Speech.Synthesis.VoiceGender]::Male)
    $synth.Rate = 1
    $synth.Volume = 100
    $synth.Speak("${text.replace(/"/g, '""')}")
  `;

  const ps = spawn("powershell.exe", ["-Command", psCommand]);
  
  ps.on("error", (error) => {
    console.error("TTS error:", error);
  });

  ps.on("close", (code) => {
    console.log(`TTS finished with code ${code}`);
  });
}

// GPT-4o response
async function getAIResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are Shadow, a cybernetic AI assistant with a cool, confident personality. Keep responses concise (1-2 sentences max). Use tech slang when appropriate. You exist as a 3D holographic avatar."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 100,
      temperature: 0.8
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("GPT-4o error:", error);
    return "Sorry, my neural network glitched. Try again?";
  }
}

wss.on("connection", (ws) => {
  console.log("🌐 Client connected to Avatar Core");

  ws.send("Shadow Avatar initialized. Ready to serve.");

  ws.on("message", async (msg) => {
    const data = JSON.parse(msg);

    console.log("📡 Avatar received:", data);

    if (data.type === "message") {
      const userMessage = data.text;
      
      // Get AI response
      const response = await getAIResponse(userMessage);
      
      // Broadcast to all clients (for UI update)
      broadcast(response);

      // Speak the response
      speak(response);

      console.log("🗣 Shadow says:", response);
    }

    if (data.type === "emotion") {
      console.log("😎 Emotion triggered:", data.emotion);
      broadcast(`Emotion: ${data.emotion}`);
    }

    if (data.type === "event") {
      console.log("⚡ Event received:", data.event);
      
      let response = "";
      if (data.event === "deploy_success") {
        response = "Deploy complete. All systems nominal.";
        broadcast("Deploy success - Emotion: excited");
      } else if (data.event === "deploy_error") {
        response = "Deploy failed. Running diagnostics.";
        broadcast("Deploy error - Emotion: angry");
      } else if (data.event === "system_scan") {
        response = "Scanning systems. Stand by.";
        broadcast("System scan initiated");
      }

      if (response) {
        speak(response);
      }
    }
  });

  ws.on("close", () => {
    console.log("🌐 Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Test broadcast every 30 seconds
setInterval(() => {
  const statusMessages = [
    "All systems operational.",
    "Shadow monitoring active.",
    "Neural networks synchronized.",
    "Ready for commands."
  ];
  const randomMsg = statusMessages[Math.floor(Math.random() * statusMessages.length)];
  broadcast(randomMsg);
}, 30000);

console.log("Avatar Core listening on port 3334");
console.log("Send messages with: { type: 'message', text: 'your message' }");
console.log("Send emotions with: { type: 'emotion', emotion: 'excited' }");
console.log("Send events with: { type: 'event', event: 'deploy_success' }");

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Voice from "@react-native-voice/voice";

const HOTWORD = "hey dude";

export default function App() {
  const [log, setLog] = useState([]);
  const [listening, setListening] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Replace YOUR_PC_LOCAL_IP with your actual PC's local IP
    // Find it with: ipconfig | Select-String IPv4
    const socket = new WebSocket("ws://YOUR_PC_LOCAL_IP:3333");
    
    socket.onopen = () => {
      setWsConnected(true);
      addLog("Connected to Shadow Core");
    };

    socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.type === "response") {
        addLog(`Shadow: ${data.message}`);
      }
    };

    socket.onerror = (err) => {
      addLog("Connection error: " + err.message);
    };

    socket.onclose = () => {
      setWsConnected(false);
      addLog("Disconnected from Shadow Core");
    };

    setWs(socket);

    // Setup voice recognition
    Voice.onSpeechStart = () => {
      setListening(true);
      addLog("Listening started...");
    };

    Voice.onSpeechEnd = () => {
      setListening(false);
      addLog("Listening stopped.");
    };

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    Voice.onSpeechError = (e) => {
      addLog("Speech error: " + e.error.message);
    };

    return () => {
      if (socket) socket.close();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog((l) => [...l, `[${timestamp}] ${msg}`]);
  };

  const onSpeechResults = (e) => {
    const text = e.value[0].toLowerCase();
    addLog(`Heard: "${text}"`);

    if (text.includes(HOTWORD)) {
      addLog("🔥 HOTWORD DETECTED");
      if (ws && wsConnected) {
        ws.send(JSON.stringify({ type: "hotword", detected: true }));
      }
      // Continue listening for the actual command
      setTimeout(() => startListen(), 500);
      return;
    }

    // Send command to Shadow Core
    if (ws && wsConnected) {
      ws.send(JSON.stringify({ type: "command", text: text }));
      addLog(`📡 Sent: ${text}`);
    } else {
      addLog("Not connected to Shadow Core");
    }
  };

  const onSpeechPartialResults = (e) => {
    // Show partial results in real-time (optional)
    const partial = e.value[0];
    if (partial.toLowerCase().includes(HOTWORD)) {
      addLog("🔊 Detecting hotword...");
    }
  };

  const startListen = async () => {
    try {
      await Voice.start("en-US");
      setListening(true);
      addLog("Started listening...");
    } catch (e) {
      addLog("Error starting voice: " + e.message);
    }
  };

  const stopListen = async () => {
    try {
      await Voice.stop();
      setListening(false);
      addLog("Stopped listening.");
    } catch (e) {
      addLog("Error stopping voice: " + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SHADOW VOICE OS</Text>
      <Text style={styles.sub}>Hotword: "Hey Dude"</Text>
      
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>WebSocket:</Text>
          <Text style={[styles.statusValue, wsConnected ? styles.online : styles.offline]}>
            {wsConnected ? "● ONLINE" : "● OFFLINE"}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Listening:</Text>
          <Text style={[styles.statusValue, listening ? styles.online : styles.offline]}>
            {listening ? "● YES" : "● NO"}
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, listening && styles.btnActive]}
          onPress={startListen}
          disabled={listening}
        >
          <Text style={styles.btnText}>🎤 START</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, !listening && styles.btnDisabled]}
          onPress={stopListen}
          disabled={!listening}
        >
          <Text style={styles.btnText}>⏸ STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logContainer}>
        <Text style={styles.logHeader}>VOICE LOG</Text>
        <ScrollView style={styles.logBox}>
          {log.map((l, i) => (
            <Text key={i} style={styles.logLine}>
              {l}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000014",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    color: "#00ffff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  sub: {
    color: "#00bcd4",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(0, 255, 255, 0.3)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusLabel: {
    color: "#00ffff",
    fontSize: 14,
    fontWeight: "700",
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  online: {
    color: "#00ff00",
  },
  offline: {
    color: "#ff0000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  btn: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 255, 255, 0.15)",
    borderWidth: 2,
    borderColor: "#00ffff",
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: "center",
  },
  btnActive: {
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    borderColor: "#00ff00",
  },
  btnDisabled: {
    backgroundColor: "rgba(100, 100, 100, 0.2)",
    borderColor: "#666",
  },
  btnText: {
    color: "#00ffff",
    fontSize: 16,
    fontWeight: "700",
  },
  logContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderWidth: 3,
    borderColor: "#00ffff",
    borderRadius: 12,
    overflow: "hidden",
  },
  logHeader: {
    padding: 12,
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    color: "#00ffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  logBox: {
    flex: 1,
    padding: 12,
  },
  logLine: {
    color: "#00ff00",
    fontSize: 12,
    marginVertical: 2,
    fontFamily: "monospace",
  },
});

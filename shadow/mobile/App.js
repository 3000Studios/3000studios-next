// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

export default function App() {
  const [log, setLog] = useState([]);
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [metrics, setMetrics] = useState({
    cpu: "0",
    memory: "0",
    uptime: "0s",
  });

  useEffect(() => {
    // Replace YOUR_PC_LOCAL_IP with your actual PC's local IP
    // Find it with: ipconfig | Select-String IPv4
    const socket = new WebSocket("ws://YOUR_PC_LOCAL_IP:3333");

    socket.onopen = () => {
      setConnected(true);
      addLog("Connected to Shadow Core");
    };

    socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);

      if (data.type === "welcome") {
        addLog(data.message);
      }

      if (data.type === "metrics") {
        setMetrics({
          cpu: data.cpu + "%",
          memory: data.memory + "%",
          uptime: formatUptime(data.uptime),
        });
      }

      if (data.type === "log") {
        addLog(data.message);
      }

      if (data.type === "deploy-complete") {
        addLog("✅ " + data.message);
      }

      if (data.type === "heal-complete") {
        addLog("⚡ " + data.message);
      }

      if (data.type === "memory-data") {
        addLog("🧠 MEMORY:\n" + data.data);
      }
    };

    socket.onerror = (err) => {
      addLog("Connection error: " + err.message);
    };

    socket.onclose = () => {
      setConnected(false);
      addLog("Disconnected from Shadow Core");
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog((l) => [...l, `[${timestamp}] ${msg}`]);
  };

  const sendCmd = (c) => {
    if (ws && connected) {
      ws.send(JSON.stringify({ command: c }));
      addLog("Sent: " + c);
    } else {
      addLog("Not connected to Shadow Core");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000014" />

      <View style={styles.header}>
        <Text style={styles.title}>SHADOW MOBILE</Text>
        <View
          style={[
            styles.status,
            connected ? styles.statusOnline : styles.statusOffline,
          ]}
        >
          <Text style={styles.statusText}>
            {connected ? "● ONLINE" : "● OFFLINE"}
          </Text>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>CPU</Text>
          <Text style={styles.metricValue}>{metrics.cpu}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>RAM</Text>
          <Text style={styles.metricValue}>{metrics.memory}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>UPTIME</Text>
          <Text style={styles.metricValue}>{metrics.uptime}</Text>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.btnDeploy]}
          onPress={() => sendCmd("deploy")}
        >
          <Text style={styles.btnIcon}>🚀</Text>
          <Text style={styles.btnText}>DEPLOY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnHeal]}
          onPress={() => sendCmd("heal")}
        >
          <Text style={styles.btnIcon}>⚡</Text>
          <Text style={styles.btnText}>HEAL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.btnMemory]}
          onPress={() => sendCmd("memory")}
        >
          <Text style={styles.btnIcon}>🧠</Text>
          <Text style={styles.btnText}>MEMORY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnScan]}
          onPress={() => sendCmd("run:git status")}
        >
          <Text style={styles.btnIcon}>📡</Text>
          <Text style={styles.btnText}>SCAN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logContainer}>
        <Text style={styles.logHeader}>SYSTEM LOG</Text>
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
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#00ffff",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 4,
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  status: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusOnline: {
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    borderWidth: 1,
    borderColor: "#00ff00",
  },
  statusOffline: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  statusText: {
    color: "#00ffff",
    fontSize: 14,
    fontWeight: "700",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(0, 255, 255, 0.3)",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  metricLabel: {
    color: "#00ffff",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValue: {
    color: "#00ff00",
    fontSize: 16,
    fontWeight: "700",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginBottom: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#00ffff",
    borderRadius: 10,
    backgroundColor: "rgba(0, 255, 255, 0.15)",
    marginHorizontal: 5,
    alignItems: "center",
  },
  btnDeploy: {
    borderColor: "#ff00ff",
  },
  btnHeal: {
    borderColor: "#ffff00",
  },
  btnMemory: {
    borderColor: "#00ff00",
  },
  btnScan: {
    borderColor: "#00ffff",
  },
  btnIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  btnText: {
    color: "#00ffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  logContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderTopWidth: 3,
    borderTopColor: "#00ffff",
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
    padding: 10,
  },
  logLine: {
    color: "#00ff00",
    fontSize: 11,
    marginVertical: 2,
    fontFamily: "monospace",
  },
});

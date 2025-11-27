<!--
  Copyright (c) 2025 NAME.
  All rights reserved.
  Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
-->

# Shadow Voice OS

**Hands-Free Voice Assistant for Shadow AI**

## 🔥 Features

- **Hotword Detection** — Say "Hey Dude" to activate voice commands
- **Continuous Listening** — Always ready to receive commands
- **WebSocket Communication** — Real-time connection to Shadow Core
- **Voice Recognition** — Powered by @react-native-voice/voice
- **Command Processing** — Deploy, heal, scan, and more
- **Real-Time Logging** — See all voice interactions instantly

## 📦 Installation

```powershell
cd shadow/mobile-voice
npm install
```

## 🚀 Quick Start

### 1. Start Shadow Core Voice Server

First, ensure Shadow Core voice.js is running:

```powershell
cd shadow/core
node voice.js
```

You should see:
```
🔥 Shadow Voice Core online at ws://0.0.0.0:3333
Listening for voice commands on port 3333
```

### 2. Configure Your PC's Local IP

Edit `App.js` and replace `YOUR_PC_LOCAL_IP` with your actual PC's local IP address:

```javascript
const ws = new WebSocket("ws://192.168.1.100:3333");
```

To find your PC's local IP:
```powershell
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

### 3. Start the Voice OS App

```powershell
npm start
```

Scan the QR code with Expo Go app on your Android phone.

## 🎤 How to Use

1. **Open the app** on your Android device
2. **Tap "START LISTENING"** — mic icon will activate
3. **Say "Hey Dude"** — the hotword will trigger
4. **Wait for "Yes Champ?"** — Shadow is listening
5. **Give your command** — e.g., "Deploy the site"
6. **View real-time log** — see all interactions

## 🗣 Voice Commands

- **"Deploy"** — Runs `npm run build` on your PC
- **"Heal"** — Restarts all PM2 processes
- **"Scan" / "Status"** — Checks git status
- **"Memory"** — Access Shadow's encrypted memory

## 📱 Building APK

### Local Build (Recommended)

```powershell
.\build.ps1
```

This will:
- Install dependencies
- Build APK locally
- Output: `shadow-voiceos.apk`

### Cloud Build (EAS)

```powershell
npm install -g eas-cli
eas login
eas build -p android
```

## ⚙️ Configuration

### app.config.js

Key permissions required:
- `INTERNET` — WebSocket communication
- `RECORD_AUDIO` — Voice recognition
- `WAKE_LOCK` — Keep screen awake during listening
- `FOREGROUND_SERVICE` — Background voice detection

### package.json

Core dependencies:
- `@react-native-voice/voice` — Voice recognition engine
- `expo` — React Native framework
- `react-native` — Mobile app core

## 🔧 Troubleshooting

### "Connection error" or "Disconnected"

1. Verify Shadow Core voice.js is running on your PC
2. Check firewall settings — allow port 3333
3. Ensure PC and phone are on same WiFi network
4. Verify local IP address in App.js

### Voice recognition not working

1. Grant microphone permissions in Android settings
2. Ensure speech recognition is enabled on device
3. Check if hotword "hey dude" is pronounced clearly
4. Review logs in real-time log view

### "No response from Shadow"

1. Check Shadow Core logs: `cd shadow/core && node voice.js`
2. Verify WebSocket connection (green ONLINE indicator)
3. Test with simple command: "status"

## 🏗 Architecture

```
┌─────────────────────┐
│  Voice OS (Mobile)  │
│  - Hotword Detection│
│  - Voice Recognition│
│  - WebSocket Client │
└──────────┬──────────┘
           │
           │ ws://PC_IP:3333
           │
┌──────────▼──────────┐
│ Shadow Core (PC)    │
│  - voice.js Server  │
│  - Command Processor│
│  - System Execution │
└─────────────────────┘
```

### Data Flow

1. **User speaks** → React Native Voice captures audio
2. **Hotword detected** → Sends `{type: "hotword", detected: true}`
3. **Command captured** → Sends `{type: "command", text: "deploy"}`
4. **Shadow Core processes** → Executes npm/git/pm2 commands
5. **Response sent** → `{type: "response", message: "..."}`
6. **UI updates** → Real-time log displays interaction

## 📝 Code Structure

```
shadow/mobile-voice/
├── App.js              # Main voice assistant component
├── package.json        # Dependencies
├── app.config.js       # Expo config + permissions
├── babel.config.js     # Babel transpiler config
├── eas.json            # EAS build settings
├── build.ps1           # Local APK build script
├── start.ps1           # Quick start script
└── assets/             # Icon, splash screen
```

## 🔐 Security Notes

- Voice commands execute system-level operations
- WebSocket traffic is unencrypted (local network only)
- Hotword detection happens on-device
- No voice data sent to cloud (except speech-to-text API)

## 🚀 Next Steps

- [ ] Add authentication for WebSocket
- [ ] Implement voice feedback (TTS responses)
- [ ] Add custom hotword training
- [ ] Create command history/replay
- [ ] Offline command queueing
- [ ] Multi-language support

## 📄 License

Proprietary — All rights reserved.

---

**Shadow Voice OS** — Built for Shadow AI Ecosystem  
**Version:** 1.0.0  
**Author:** Mr. J.W. Swain

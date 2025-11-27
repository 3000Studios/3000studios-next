<!--
  Copyright (c) 2025 NAME.
  All rights reserved.
  Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
-->

# 🟦 Shadow Mobile Control

**Full remote control of Shadow AI from your Android phone.**

---

## 📱 WHAT IS THIS?

Shadow Mobile is a React Native app that connects to your Shadow Command Center UI via WebSocket, giving you full control over:

- 🚀 **Deploy** — Trigger production deployments
- ⚡ **Heal** — Restart PM2 processes
- 🧠 **Memory** — View encrypted Shadow memory
- 📡 **Scan** — Run git status and other commands
- 📊 **Real-time metrics** — CPU, RAM, uptime from your PC

---

## 🚀 QUICK START

### Prerequisites

1. **Node.js** installed on your PC
2. **Expo Go** app installed on your phone ([Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent))
3. **Shadow UI server** running (`node shadow/ui/server.js`)
4. **PC and phone on the same WiFi network**

---

### Step 1: Find Your PC's Local IP

Run this in PowerShell:

```powershell
ipconfig | Select-String IPv4
```

**Example output:**
```
IPv4 Address. . . . . . . . . . . : 10.0.0.46
```

Your local IP is: `10.0.0.46`

---

### Step 2: Update App.js

Open `shadow/mobile/App.js` and replace `YOUR_PC_LOCAL_IP`:

```javascript
const socket = new WebSocket("ws://10.0.0.46:3333");
```

---

### Step 3: Start Shadow UI Server

In a new terminal:

```powershell
cd C:\Users\MrJws\3000studios-next\shadow\ui
node server.js
```

You should see:
```
🟪 Shadow Command Center UI running on http://localhost:3333
WebSocket server ready on port 3333
```

---

### Step 4: Install Dependencies

```powershell
cd C:\Users\MrJws\3000studios-next\shadow\mobile
npm install
```

---

### Step 5: Start Expo Dev Server

**Option 1: Quick Start (PowerShell)**
```powershell
.\start.ps1
```

**Option 2: Manual Start**
```powershell
npx expo start
```

---

### Step 6: Open on Your Phone

1. Open **Expo Go** app on your phone
2. Scan the QR code shown in terminal
3. App loads and connects to Shadow UI

You should see "● ONLINE" in the app header.

---

## 📦 BUILD APK (INSTALL ON PHONE)

To create a standalone APK you can install without Expo Go:

### Step 1: Create Expo Account

Visit [expo.dev](https://expo.dev) and sign up.

### Step 2: Get EAS Access Token

1. Go to [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens)
2. Create new token
3. Copy the token

### Step 3: Run Build Script

```powershell
cd C:\Users\MrJws\3000studios-next\shadow\mobile
.\build.ps1
```

**The script will:**
- Install dependencies
- Install EAS CLI
- Login to Expo (paste your token)
- Configure build
- Build APK locally

### Step 4: Install APK

1. Connect phone to PC via USB
2. Transfer APK to phone
3. Open APK file and install
4. Enable "Install from unknown sources" if prompted

**Or:**

Upload APK to cloud storage (Google Drive, Dropbox) and download on phone.

---

## 🎨 APP FEATURES

### Real-Time Metrics
- **CPU Load** — Live system load average
- **RAM Usage** — Memory consumption percentage
- **Uptime** — System uptime in hours/minutes
- Updates every 2 seconds via WebSocket

### Command Buttons
- **🚀 DEPLOY** — Runs `npm run build` on PC
- **⚡ HEAL** — Restarts all PM2 processes
- **🧠 MEMORY** — Fetches Shadow's encrypted memory
- **📡 SCAN** — Runs `git status` (customizable)

### System Log
- Real-time command output
- Timestamped entries
- Auto-scroll to latest
- Monospace font for code

### Connection Status
- **● ONLINE** — Connected to Shadow UI
- **● OFFLINE** — Disconnected (check WiFi/server)

---

## 🔧 CONFIGURATION

### Change WebSocket Server

Edit `App.js`:

```javascript
const socket = new WebSocket("ws://YOUR_PC_LOCAL_IP:3333");
```

Replace with:
- **Local IP**: `ws://10.0.0.46:3333`
- **Cloudflare Tunnel**: `wss://shadow.yourdomain.com`
- **Localhost** (Android emulator): `ws://10.0.2.2:3333`

### Customize Commands

Edit the `sendCmd()` calls in `App.js`:

```javascript
<TouchableOpacity onPress={() => sendCmd("run:git status")}>
  <Text>SCAN</Text>
</TouchableOpacity>
```

Change `"run:git status"` to any command:
- `"run:npm test"`
- `"run:pm2 list"`
- `"run:shadow analyze"`

### Change App Colors

Edit `styles` in `App.js`:

```javascript
const styles = StyleSheet.create({
  // Change primary color
  title: { color: "#00ffff" }, // Change to #ff00ff for magenta
  
  // Change button colors
  btnDeploy: { borderColor: "#ff00ff" },
});
```

---

## 🌐 REMOTE ACCESS (OUTSIDE YOUR NETWORK)

To control Shadow from anywhere (not just local WiFi):

### Option 1: Cloudflare Tunnel (Recommended)

1. Install Cloudflare Tunnel:
   ```powershell
   winget install Cloudflare.cloudflared
   ```

2. Expose Shadow UI:
   ```powershell
   cloudflared tunnel --url http://localhost:3333
   ```

3. Get public URL (e.g., `https://shadow-xyz.trycloudflare.com`)

4. Update `App.js`:
   ```javascript
   const socket = new WebSocket("wss://shadow-xyz.trycloudflare.com");
   ```

5. Rebuild APK

### Option 2: Ngrok

1. Install ngrok: [ngrok.com](https://ngrok.com)
2. Expose port:
   ```powershell
   ngrok http 3333
   ```
3. Use forwarding URL in app

---

## 🧪 TESTING

### Test Local Connection

1. Start Shadow UI server
2. Run Expo: `npx expo start`
3. Open app on phone
4. Check for "● ONLINE" status
5. Click **DEPLOY** button
6. Check log for output

### Test Commands

**Deploy Test:**
```
Click DEPLOY → Log shows "Initiating deploy..." → Build runs → "Deploy successful"
```

**Heal Test:**
```
Click HEAL → Log shows "Triggering system heal..." → PM2 restarts → "System healed"
```

**Memory Test:**
```
Click MEMORY → Log shows "Fetching Shadow memory..." → Memory data appears
```

### Test Metrics

Wait 2-4 seconds after connecting. You should see:
- CPU: `1.23%`
- RAM: `45.67%`
- UPTIME: `2h 15m`

---

## 🐛 TROUBLESHOOTING

### "Cannot connect to server"

**Solution 1:** Check PC's local IP matches `App.js`
```powershell
ipconfig | Select-String IPv4
```

**Solution 2:** Make sure Shadow UI server is running
```powershell
cd shadow/ui
node server.js
```

**Solution 3:** Check firewall allows port 3333
```powershell
New-NetFirewallRule -DisplayName "Shadow UI" -Direction Inbound -LocalPort 3333 -Protocol TCP -Action Allow
```

**Solution 4:** Verify phone and PC are on same WiFi

---

### "● OFFLINE" status

1. Check WebSocket URL in `App.js`
2. Restart Shadow UI server
3. Restart app (shake phone → Reload)
4. Check PC firewall settings

---

### "Build failed" when creating APK

**Solution 1:** Install Android SDK
- Download [Android Studio](https://developer.android.com/studio)
- Install SDK via SDK Manager

**Solution 2:** Use cloud build instead
```powershell
eas build -p android --profile preview
```
(Slower but doesn't require local Android setup)

---

### Expo Go crashes on startup

**Solution:** Clear Expo cache
```powershell
npx expo start -c
```

---

## 📊 ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│               ANDROID PHONE (Shadow Mobile)         │
│  React Native + Expo + WebSocket Client             │
└─────────────────────┬───────────────────────────────┘
                      ↓
              WebSocket Connection
              ws://10.0.0.46:3333
                      ↓
┌─────────────────────────────────────────────────────┐
│                  PC (Shadow UI Server)               │
│  Express + WebSocket Server (Port 3333)             │
└─────────────────────┬───────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│              COMMAND EXECUTION (PC)                  │
│  npm run build | pm2 restart | Shadow Core          │
└─────────────────────────────────────────────────────┘
```

---

## 📱 SCREENSHOTS

(App UI features neon cyber theme matching Shadow Command Center)

**Main Screen:**
- Holographic title "SHADOW MOBILE"
- Status indicator (online/offline)
- 3 metric cards (CPU, RAM, Uptime)
- 4 action buttons (Deploy, Heal, Memory, Scan)
- Live scrolling log

**Colors:**
- Background: `#000014` (dark navy)
- Primary: `#00ffff` (cyan)
- Accent: `#ff00ff` (magenta), `#ffff00` (yellow), `#00ff00` (green)
- Log: `#00ff00` (green monospace)

---

## 🚀 NEXT STEPS

### Add Voice Commands

Integrate with React Native Voice:
```bash
npm install @react-native-voice/voice
```

Speak commands → transcribe → send to Shadow

### Add File Browser

Browse Shadow's memory database, view logs, edit files on PC.

### Add 3D Avatar

Use Three.js (React Three Fiber):
```bash
npm install @react-three/fiber @react-three/drei
```

Animated Shadow avatar on mobile.

### Add Push Notifications

Get alerts when deployments complete, errors occur, system needs healing.

---

## 📋 CODE PACK 8 — COMPLETE

**Champ… you can now control Shadow from your phone.** 🟦

### What You Built:
- ✅ React Native mobile app
- ✅ WebSocket connection to Shadow UI
- ✅ Real-time metrics (CPU, RAM, uptime)
- ✅ Deploy/Heal/Memory/Scan buttons
- ✅ Live system log
- ✅ APK build scripts
- ✅ Neon cyber theme (matches desktop UI)
- ✅ Connection status indicator

### Files Created:
- `App.js` — Main React Native component
- `package.json` — Dependencies
- `app.config.js` — Expo configuration
- `build.ps1` — APK builder script
- `start.ps1` — Dev server launcher
- `eas.json` — Build configuration
- `babel.config.js` — Babel transpiler
- `assets/icon.png` — App icon (SVG)
- `assets/splash.png` — Splash screen (SVG)
- `assets/favicon.png` — Web favicon (SVG)

---

**The Shadow System is now accessible from anywhere via mobile.** 🚀📱

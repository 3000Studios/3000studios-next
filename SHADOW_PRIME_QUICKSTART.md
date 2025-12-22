# Shadow PRIME OS - Quick Start Guide

## 🎯 What You Have Now

Your website now has a fully operational **Shadow PRIME OS** running in the background!

### ✅ Active Systems

1. **EventBus** - Central nervous system routing all events
2. **PrimeLoop** - System heartbeat (checks every 8 seconds)
3. **SelfCheckLoop** - Self-diagnostics (runs every 4 seconds)
4. **FusionEventHandler** - World module coordinator
5. **MoodMap** - Emotional atmosphere tracker

All of these run **invisibly** on every page - they don't affect the UI but provide the foundation for intelligent, autonomous features.

## 🖥️ Viewing the OS in Action

### Option 1: Add to Shadow Command Center

To see Shadow PRIME OS events in real-time, add the monitor to `/app/shadow/page.tsx`:

```typescript
import ShadowOSMonitor from "@/components/ShadowOSMonitor";

// Inside the authenticated view, add:
<div className="mb-6">
  <ShadowOSMonitor />
</div>
```

This will show live system events as they happen!

### Option 2: Browser Console

Open your browser's developer console on any page and run:

```javascript
// Listen for Shadow events
window.addEventListener("shadow-event", (e) => {
  console.log("Shadow Event:", e.detail);
});
```

You'll see events like:
- `system-check` every 8 seconds
- `system-selfcheck` every 4 seconds
- `optimize` randomly (15% chance per check)

## 🎨 Changing World Mood

Trigger mood changes from anywhere:

```javascript
window.dispatchEvent(
  new CustomEvent("shadow-event", {
    detail: { 
      type: "ui-mood", 
      value: "gold-conversion-mode" 
    },
  })
);
```

Available moods:
- `cyber-calm` - Default relaxed state
- `teal-focus` - Concentration mode
- `sapphire-hype` - Energetic state
- `gold-conversion-mode` - Sales optimization
- `purple-alert` - Warning state
- `red-defense` - High alert
- `neon-creativity` - Creative mode

The mood is applied to `document.documentElement` as a `data-mood` attribute, allowing CSS to react to it.

## 🔧 Extending the System

### Adding a New System Loop

Create a new file in `components/os/`:

```typescript
"use client";
import { useEffect } from "react";

export default function MyCustomLoop() {
  useEffect(() => {
    const interval = setInterval(() => {
      window.dispatchEvent(
        new CustomEvent("shadow-event", {
          detail: { type: "my-custom-check" },
        })
      );
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return null;
}
```

Then add it to `app/layout.tsx`:

```typescript
import MyCustomLoop from "@/components/os/MyCustomLoop";

// In the body:
<MyCustomLoop />
```

### Adding a New Event Handler

Create a component that listens for events:

```typescript
"use client";
import { useEffect } from "react";

export default function MyEventHandler() {
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { type } = customEvent.detail || {};
      
      if (type === "my-custom-check") {
        // Do something!
        console.log("Custom check triggered!");
      }
    };

    window.addEventListener("shadow-event", handler);
    return () => window.removeEventListener("shadow-event", handler);
  }, []);

  return null;
}
```

## 📊 Integration with Existing Shadow Features

Shadow PRIME OS works seamlessly with your existing:

- **Shadow Command Center** (`/shadow`) - Voice & manual commands
- **Shadow API Routes** - Backend processing
- **Shadow Engine** (`lib/shadow/`) - Code execution & deployment
- **AI Chatbot** - Natural language processing

You can now dispatch events from any of these systems to trigger OS behaviors!

### Example: Trigger from API Route

```typescript
// In any API route
export async function POST(request: Request) {
  // Do your work...
  
  // Notify the OS
  // (Note: This would need SSE or WebSocket for client notification)
  // For now, client-side components can dispatch events
  
  return Response.json({ success: true });
}
```

## 🚀 What's Next?

Your core infrastructure is complete! Optional enhancements you could add:

### Easy Additions (1-2 hours)
- Add more system loops for specific checks
- Create visual reactions to mood changes
- Add event-triggered animations
- Build analytics from event history

### Medium Additions (3-8 hours)
- Persistent event logging (KV store)
- Event-based notifications
- System health dashboard
- Automated optimization triggers

### Advanced Additions (1-3 days)
- AI-powered event interpretation
- Predictive system behaviors
- Autonomous code generation
- Voice-controlled OS management

**But remember:** You don't need any of these to launch. Your site is fully functional right now!

## 📖 Full Documentation

See `SHADOW_PRIME_OS.md` for complete technical documentation.

## ❓ Questions?

The event system is your main interface. When in doubt:
1. Dispatch an event with `window.dispatchEvent(new CustomEvent("shadow-event", {...}))`
2. Listen for events with `window.addEventListener("shadow-event", handler)`
3. Check the browser console to see what's happening

**Shadow PRIME OS is active and ready to evolve with your needs!** 🎯

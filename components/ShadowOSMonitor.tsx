"use client";

// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

"use client";

import { useEffect, useState } from "react";

interface OSEvent {
  type: string;
  timestamp: number;
  data?: any;
}

/**
 * ShadowOSMonitor - Live monitor for Shadow PRIME OS events
 * Displays real-time system activity and health
 */
export default function ShadowOSMonitor() {
  const [events, setEvents] = useState<OSEvent[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { type, ...data } = customEvent.detail || {};

      const newEvent: OSEvent = {
        type,
        timestamp: Date.now(),
        data: Object.keys(data).length > 0 ? data : undefined,
      };

      setEvents((prev) => [newEvent, ...prev].slice(0, 20)); // Keep last 20 events
    };

    if (isActive) {
      window.addEventListener("shadow-event", handler);
    }

    return () => window.removeEventListener("shadow-event", handler);
  }, [isActive]);

  const getEventColor = (type: string) => {
    if (type.includes("check")) return "text-green-400";
    if (type.includes("optimize")) return "text-yellow-400";
    if (type.includes("mood")) return "text-purple-400";
    if (type.includes("error")) return "text-red-400";
    return "text-blue-400";
  };

  const getEventIcon = (type: string) => {
    if (type.includes("check")) return "✓";
    if (type.includes("optimize")) return "⚡";
    if (type.includes("mood")) return "🎨";
    if (type.includes("error")) return "❌";
    return "•";
  };

  return (
    <div className="bg-black/40 border border-gold p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center gap-2">
          <span className="animate-pulse">●</span>
          Shadow PRIME OS Monitor
        </h2>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1 rounded text-sm font-bold ${
            isActive
              ? "bg-green-600 text-white"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          {isActive ? "ACTIVE" : "PAUSED"}
        </button>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {events.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Waiting for system events...
          </div>
        )}

        {events.map((event, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 bg-black/20 rounded border border-gray-700 hover:border-gold transition-colors"
          >
            <span className={`text-xl ${getEventColor(event.type)}`}>
              {getEventIcon(event.type)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${getEventColor(event.type)}`}>
                  {event.type}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {event.data && (
                <pre className="text-xs text-gray-400 mt-1 overflow-x-auto">
                  {JSON.stringify(event.data, null, 2)}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Events:</span>{" "}
            <span className="text-white font-bold">{events.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>{" "}
            <span className="text-green-400 font-bold">Online</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setEvents([])}
          className="w-full px-4 py-2 bg-red-600/20 border border-red-600 rounded text-red-400 hover:bg-red-600/30 transition-colors"
        >
          Clear Event Log
        </button>
      </div>
    </div>
  );
}

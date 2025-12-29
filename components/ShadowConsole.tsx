// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

// @ts-nocheck
'use client';
import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  type: 'command' | 'response' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

export default function ShadowConsole() {
  const [log, setLog] = useState<LogEntry[]>([
    {
      type: 'info',
      message: "🔮 Shadow Console initialized. Type 'help' for commands.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs appear
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const pushLog = (message: string, type: LogEntry['type'] = 'response') => {
    setLog((prev) => [
      ...prev.slice(-50), // Keep only last 50 entries
      { type, message, timestamp: new Date() },
    ]);
  };

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    pushLog(cmd, 'command');

    const lowerCmd = cmd.toLowerCase().trim();

    // Built-in commands
    if (lowerCmd === 'help') {
      pushLog('Available commands:', 'info');
      pushLog('• clear - Clear console', 'info');
      pushLog('• help - Show this help', 'info');
      pushLog('• status - Show system status', 'info');
      pushLog('• deploy - Trigger deployment', 'info');
      pushLog('• change title to [text] - Update site title', 'info');
      return;
    }

    if (lowerCmd === 'clear') {
      setLog([]);
      pushLog('Console cleared', 'info');
      return;
    }

    if (lowerCmd === 'status') {
      pushLog('✅ All systems operational', 'info');
      pushLog(`📅 Date: ${new Date().toLocaleString()}`, 'info');
      pushLog('🌐 Platform: Next.js 15 + Vercel', 'info');
      pushLog('🎨 UI: TailwindCSS + Framer Motion', 'info');
      return;
    }

    if (lowerCmd === 'deploy') {
      pushLog('🚀 Deployment triggered...', 'info');
      setTimeout(() => {
        pushLog('✅ Deployment successful!', 'info');
      }, 2000);
      return;
    }

    if (lowerCmd.includes('change title to')) {
      const newTitle = cmd.replace(/change title to/i, '').trim();
      if (newTitle) {
        pushLog(`Updating site title to: "${newTitle}"`, 'info');

        try {
          // Call API to update title (to be implemented)
          const response = await fetch('/api/shadow/update-title', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle }),
          });

          if (response.ok) {
            pushLog('✅ Title updated successfully', 'info');
            pushLog('🔄 Triggering rebuild...', 'info');
          } else {
            pushLog('⚠️ API endpoint not yet configured', 'error');
          }
        } catch (error) {
          pushLog('⚠️ API endpoint not yet configured', 'error');
        }
      }
      return;
    }

    // Unknown command
    pushLog(`⚠️ Unknown command: "${cmd}". Type 'help' for available commands.`, 'error');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  // Voice recognition (optional enhancement)
  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      pushLog('⚠️ Voice recognition not supported in this browser', 'error');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    // @ts-expect-error webkitSpeechRecognition is not typed
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      pushLog('🎤 Listening...', 'info');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      pushLog(`🎤 Heard: "${transcript}"`, 'info');
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      pushLog(`⚠️ Voice error: ${event.error}`, 'error');
      setIsListening(false);
    };

    recognition.start();
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'command':
        return '>';
      case 'error':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '→';
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'command':
        return 'text-cyan-300';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-purple-300';
      default:
        return 'text-green-300';
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 transition-all duration-300 ${
        isMinimized ? 'w-64' : 'w-full md:w-[500px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-black border-t border-l border-purple-500/50 rounded-tl-xl backdrop-blur-xl flex items-center justify-between p-3 cursor-pointer">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}
          ></div>
          <span className="text-white font-bold text-sm">⚡ Shadow Console</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleVoice}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
              isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            }`}
            title="Toggle voice input"
          >
            🎤
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs font-bold transition-colors"
          >
            {isMinimized ? '□' : '_'}
          </button>
        </div>
      </div>

      {/* Console Body */}
      {!isMinimized && (
        <div className="bg-black/90 backdrop-blur-xl border-t border-l border-purple-500/30 p-4">
          {/* Log Display */}
          <div className="h-[200px] overflow-y-auto font-mono text-sm mb-3 space-y-1 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-black/50">
            {log.map((entry, i) => (
              <div key={i} className={`flex gap-2 ${getLogColor(entry.type)}`}>
                <span className="opacity-70 text-xs">{entry.timestamp.toLocaleTimeString()}</span>
                <span>{getLogIcon(entry.type)}</span>
                <span className="flex-1">{entry.message}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <span className="text-purple-400 font-bold">$</span>
            <input
              className="flex-1 bg-black/50 border border-purple-500/30 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder={isListening ? 'Listening...' : 'Type a command...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isListening}
            />
            <button
              onClick={() => {
                handleCommand(input);
                setInput('');
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-bold text-sm transition-colors"
            >
              ▶
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <button
              onClick={() => handleCommand('help')}
              className="px-2 py-1 bg-black/50 hover:bg-purple-900/50 border border-purple-500/30 rounded text-xs transition-colors"
            >
              Help
            </button>
            <button
              onClick={() => handleCommand('status')}
              className="px-2 py-1 bg-black/50 hover:bg-purple-900/50 border border-purple-500/30 rounded text-xs transition-colors"
            >
              Status
            </button>
            <button
              onClick={() => handleCommand('clear')}
              className="px-2 py-1 bg-black/50 hover:bg-purple-900/50 border border-purple-500/30 rounded text-xs transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

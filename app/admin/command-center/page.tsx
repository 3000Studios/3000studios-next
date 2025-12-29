'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import 3D components to avoid SSR issues
const Avatar3D = dynamic(() => import('@/components/Avatar3D'), { ssr: false });

interface CommandMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export default function CommandCenter() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CommandMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  useEffect(() => {
    // Initialize Web Speech API
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setVoiceTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      if (voiceTranscript) {
        setInput(voiceTranscript);
      }
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setVoiceTranscript('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: CommandMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Parse natural language intent
      const response = await fetch('/api/command-center/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: userMessage.content }),
      });

      const data = await response.json();

      if (data.preview) {
        setPreviewContent(data.preview);
        setShowPreview(true);
      }

      const assistantMessage: CommandMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response || 'Command processed',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: CommandMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: 'Error processing command',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = async () => {
    if (!previewContent) return;

    try {
      const response = await fetch('/api/command-center/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preview: previewContent }),
      });

      const data = await response.json();

      const systemMessage: CommandMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: data.message || 'Changes deployed to production',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemMessage]);
      setShowPreview(false);
      setPreviewContent('');
    } catch (error) {
      const errorMessage: CommandMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: 'Error deploying changes',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-screen flex">
        {/* Left Side - 3D Avatar */}
        <div className="w-1/3 border-r border-amber-400/20 bg-gradient-to-b from-slate-950 to-black">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-amber-400/20">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                AI Assistant
              </h2>
            </div>
            <div className="flex-1">
              <Avatar3D isListening={isListening} isSpeaking={isProcessing} />
            </div>
          </div>
        </div>

        {/* Center - Command Interface */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl p-4 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black'
                      : msg.type === 'system'
                        ? 'bg-red-900/20 border border-red-500/50 text-red-400'
                        : 'bg-slate-900/90 border border-amber-400/20 text-white'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs mt-2 opacity-50">{msg.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Voice Transcript Display */}
          {isListening && voiceTranscript && (
            <div className="p-4 bg-amber-900/20 border-t border-amber-400/20">
              <p className="text-amber-400">
                <span className="font-bold">Listening:</span> {voiceTranscript}
              </p>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-amber-400/20 bg-slate-950/50">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command or use voice..."
                className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-500"
                disabled={isProcessing}
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {isListening ? '🎙️ Stop' : '🎤 Voice'}
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold rounded-lg hover:from-amber-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Send'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Preview Window */}
        {showPreview && (
          <div className="w-1/3 border-l border-amber-400/20 bg-slate-950 flex flex-col">
            <div className="p-6 border-b border-amber-400/20">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Preview
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-sm text-slate-300 bg-slate-900 p-4 rounded-lg overflow-x-auto">
                {previewContent}
              </pre>
            </div>
            <div className="p-6 border-t border-amber-400/20">
              <button
                onClick={handleConfirm}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all"
              >
                Confirm & Deploy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

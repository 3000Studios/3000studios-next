'use client';

import { useEffect, useRef, useState } from 'react';
import { AudioBackground } from '@/components/AudioBackground';
import { Footer } from '@/components/ui/Footer';
import PublicAvatar from '@/components/avatar/PublicAvatar';

export default function HomePage() {
  const [messages, setMessages] = useState([
    { from: 'avatar', text: 'Welcome to 3000 Studios. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await fetch('/api/shadow/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: 'avatar', text: data.reply || 'I am here to help with anything you need.' },
      ]);
    } catch (e) {
      setMessages((prev) => [...prev, { from: 'avatar', text: 'Network issue—please try again.' }]);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <main className="relative bg-black min-h-screen">
      <AudioBackground publicId="4d103589a54319c127e26fc4c1945714" autoplay={true} />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
        >
          <source
            src="https://videos.pexels.com/video-files/854406/854406-hd_1280_720_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black -z-5" />

        {/* 3D Interactive Avatar */}
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[500px] z-20">
          <PublicAvatar />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 py-16 mt-[420px]">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
              Welcome to 3000 Studios
            </h1>
            <p className="text-lg text-platinum/80 max-w-2xl">
              Speak or type - Our AI avatar is listening and ready to help.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl p-6 md:p-8 space-y-6">
            <div className="h-60 overflow-y-auto pr-2 space-y-3 text-left">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      msg.from === 'user'
                        ? 'bg-amber-400 text-black'
                        : 'bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/15 rounded-full px-4 py-3">
                <button
                  type="button"
                  onClick={startListening}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-amber-400 text-black font-bold shadow-lg transition transform hover:scale-105 ${
                    isListening ? 'ring-4 ring-amber-300' : ''
                  }`}
                  aria-label="Speak to the assistant"
                >
                  🎤
                </button>
                <input
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-platinum/60"
                  placeholder="Tap the mic or type your request..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
              </div>
              <button
                onClick={sendMessage}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold shadow-[0_10px_30px_rgba(255,193,7,0.35)] hover:scale-105 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

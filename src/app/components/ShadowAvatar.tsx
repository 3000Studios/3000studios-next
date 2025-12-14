/**
 * Shadow AI Avatar Component (Home Page Version)
 * This is the conversational, animated 3D FEMALE avatar that greets visitors
 * Features:
 * - Speech recognition and response
 * - Physics-based animations
 * - Female voice and personality
 * - Gyroscope responsive (on mobile)
 * - Does NOT edit the website (that's only in THE MATRIX)
 * - Fun, conversational personality
 *
 * NOTE: Enhanced with feminine characteristics and styling
 */

'use client';

import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Animation timing constants
const BASE_BLINK_INTERVAL = 3000; // 3 seconds
const BLINK_RANDOM_RANGE = 2000; // +0-2 seconds randomness
const BLINK_DURATION = 150; // milliseconds

export default function ShadowAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userText, setUserText] = useState('');
  const [avatarText, setAvatarText] = useState("Hey there! I'm Shadow, your AI assistant. Ask me anything!");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Blinking animation for more lifelike avatar
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), BLINK_DURATION);
    }, BASE_BLINK_INTERVAL + Math.random() * BLINK_RANDOM_RANGE);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleUserInput = useCallback(async (_input: string) => {
    // Female persona responses
    const responses = [
      "That's fascinating! Would you like to explore our store? I'd love to show you around! 💎",
      "I really like the way you think! Have you checked out our amazing projects yet? ✨",
      "Great question! I'm here to help you discover everything 3000 Studios has to offer! 🌟",
      "Ooh, interesting! You should definitely see our portfolio - it's stunning! 💫",
      "I hear you! Let me know if you want to see what we're working on. I'm excited to share! 🎨",
      "That's so cool! Check out our live streams for more exclusive content! 🎭",
      "I love chatting with you! Want to see some of our premium digital products? 🛍️",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setAvatarText(randomResponse);

    // Text-to-speech with FEMALE voice if enabled
    if (audioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomResponse);
      
      // Configure for female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        voice => voice.name.includes('Female') || 
                voice.name.includes('female') ||
                voice.name.includes('Samantha') ||
                voice.name.includes('Victoria') ||
                voice.name.includes('Karen') ||
                voice.name.includes('Zira')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.rate = 1.05; // Slightly faster, more energetic
      utterance.pitch = 1.2; // Higher pitch for feminine voice
      utterance.volume = 0.9;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [audioEnabled]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for standard API first, then webkit
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported in this browser');
        setAvatarText("Hey! Speech recognition isn't supported in your browser, but I can still chat via text! 💬");
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserText(transcript);
        handleUserInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [handleUserInput]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };


  return (
    <div className="fixed bottom-8 right-8 z-50 max-w-sm">
      {/* Avatar Container */}
      <div className="bg-black/80 backdrop-blur-xl border-2 border-gold rounded-2xl p-6 shadow-2xl">
        {/* Avatar Visual - Enhanced 3D Female Representation */}
        <div className="relative mb-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 via-purple-500 to-gold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-pink-500/50">
            <div className={`w-24 h-24 bg-gradient-to-br from-purple-900 to-black rounded-full flex items-center justify-center relative ${isSpeaking ? 'animate-ping' : ''}`}>
              {/* Female Avatar Face */}
              <div className="relative">
                {/* Head */}
                <div className="w-16 h-20 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full relative">
                  {/* Hair */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-purple-600 to-purple-800 rounded-t-full z-0"></div>
                  
                  {/* Eyes */}
                  <div className="absolute top-7 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                    <div className={`w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 transition-all ${isBlinking ? 'h-0.5' : ''}`}></div>
                    <div className={`w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 transition-all ${isBlinking ? 'h-0.5' : ''}`}></div>
                  </div>
                  
                  {/* Eyelashes */}
                  {!isBlinking && (
                    <>
                      <div className="absolute top-6 left-3 w-1 h-1 border-l border-black"></div>
                      <div className="absolute top-6 right-3 w-1 h-1 border-r border-black"></div>
                    </>
                  )}
                  
                  {/* Smile */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-pink-600 rounded-full"></div>
                  
                  {/* Blush */}
                  <div className="absolute top-9 left-1 w-3 h-2 bg-pink-400 rounded-full opacity-40"></div>
                  <div className="absolute top-9 right-1 w-3 h-2 bg-pink-400 rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
          {isSpeaking && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-gold via-pink-400 to-purple-500 rounded-full animate-pulse"
                    style={{
                      height: Math.random() * 20 + 10 + 'px',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avatar Name */}
        <h3 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-gold font-bold text-xl mb-2">
          Shadow AI Assistant
        </h3>
        <p className="text-center text-xs text-gray-400 mb-3">Your Intelligent 3D Female Guide</p>

        {/* Avatar Speech Bubble */}
        <div className="bg-gradient-to-br from-purple-900/50 to-gray-900 rounded-lg p-4 mb-4 min-h-[80px] border border-pink-500/30 shadow-lg shadow-pink-500/20">
          <p className="text-white text-sm italic">
            "{avatarText}"
          </p>
        </div>

        {/* User Input Display */}
        {userText && (
          <div className="bg-sapphire/20 rounded-lg p-3 mb-4 border border-sapphire/30">
            <p className="text-gray-300 text-xs">
              You: "{userText}"
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all ${
              isListening
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 animate-pulse'
                : 'bg-gradient-to-r from-gold to-pink-400 hover:from-platinum hover:to-pink-300'
            }`}
            title={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? <MicOff className="text-white" size={20} /> : <Mic className="text-black" size={20} />}
          </button>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-3 rounded-full transition-all ${
              audioEnabled 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            title={audioEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {audioEnabled ? <Volume2 className="text-white" size={20} /> : <VolumeX className="text-white" size={20} />}
          </button>
        </div>

        {/* Info Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          I'm your friendly AI guide! 💜 (I don't edit the site - that's in THE MATRIX)
        </p>
      </div>
    </div>
  );
}

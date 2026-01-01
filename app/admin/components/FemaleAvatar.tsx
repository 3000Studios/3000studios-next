"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic import of the scene to ensure NO server-side rendering of Three.js
const AvatarScene = dynamic(() => import("./AvatarScene"), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-cyan-500 text-xs">INITIALIZING AVATAR...</div>
});

export default function FemaleAvatar() {
  const [expression, setExpression] = useState('neutral');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Voice Event Listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVoice = (e: any) => {
        if (e.detail?.target === 'avatar') {
             if (e.detail.action === 'speak') {
                 setIsSpeaking(true);
                 setExpression('talking');
                 setTimeout(() => {
                     setIsSpeaking(false);
                     setExpression('neutral');
                 }, 3000); 
             }
             if (e.detail.action === 'emotion') {
                 setExpression(e.detail.value);
             }
        }
    };
    
    window.addEventListener('voice-command', handleVoice as any);
    return () => window.removeEventListener('voice-command', handleVoice as any);
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-auto">
      {/* Status HUD */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
         <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-yellow-400 animate-ping' : 'bg-cyan-500'}`} />
             <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                 AI: {expression}
             </span>
         </div>
      </div>

      <AvatarScene expression={expression} isSpeaking={isSpeaking} />
    </div>
  );
}

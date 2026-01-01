"use client";

import { useState } from 'react';
import { handleVoicePayload } from '@/lib/voice/payloadHandler';

export default function CommandCenter() {
  const [status, setStatus] = useState("Ready");

  const triggerUpdate = (accent: string) => {
    setStatus(`Applying ${accent}...`);
    // Simulate Voice Payload
    handleVoicePayload({
      target: 'style',
      path: 'accent',
      value: accent
    });
    setTimeout(() => setStatus("Active"), 500);
  };

  return (
    <section className="min-h-screen p-8 pt-24 bg-black/90 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Live Command Center
        </h1>
        <p className="text-gray-400 mb-8">Phase 33: Real-time System Control (No Rebuilds)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Style Control Card */}
          <div className="p-6 rounded-xl border border-yellow-500/30 bg-black/50 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">Global Theme Engine</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => triggerUpdate('gold')}
                  className="p-4 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-800 hover:scale-105 transition-all border border-yellow-400/50"
                >
                  GOLD
                </button>
                <button 
                  onClick={() => triggerUpdate('platinum')}
                  className="p-4 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 hover:scale-105 transition-all border border-white/50"
                >
                  PLATINUM
                </button>
                <button 
                  onClick={() => triggerUpdate('sapphire')}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 hover:scale-105 transition-all border border-blue-400/50"
                >
                  SAPPHIRE
                </button>
              </div>
              <p className="text-sm text-center font-mono text-cyan-400 mt-4">
                STATUS: {status}
              </p>
            </div>
          </div>

          {/* Monetization Loops (Phase 34-60) */}
          <div className="p-6 rounded-xl border border-green-500/30 bg-black/50 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 text-green-500">Revenue Loops (On-Air)</h2>
            <div className="space-y-4">
              <button 
                onClick={() => handleVoicePayload({ target: 'monetization', path: 'inject', value: 'prod_001' })}
                className="w-full p-4 rounded-lg bg-gradient-to-r from-green-600 to-green-800 hover:scale-105 transition-all border border-green-400/50 flex justify-between items-center"
              >
                <span>🚀 INJECT: AI Toolkit ($97)</span>
                <span className="text-xs bg-black/30 px-2 py-1 rounded">PROD_001</span>
              </button>
              
              <button 
                onClick={() => handleVoicePayload({ target: 'monetization', path: 'inject', value: 'prod_002' })}
                className="w-full p-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:scale-105 transition-all border border-purple-400/50 flex justify-between items-center"
              >
                <span>🎓 INJECT: Masterclass ($297)</span>
                <span className="text-xs bg-black/30 px-2 py-1 rounded">PROD_002</span>
              </button>

              <div className="pt-4 border-t border-white/10">
                 <h3 className="text-sm text-gray-400 mb-2">SCARCITY TRIGGERS</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => handleVoicePayload({ target: 'monetization', path: 'scarcity', value: '15' })} // 15 mins
                        className="p-2 rounded bg-red-900/50 hover:bg-red-800 border border-red-500/30 text-xs font-mono text-red-300"
                    >
                        15 MIN TIMER
                    </button>
                    <button 
                        onClick={() => handleVoicePayload({ target: 'monetization', path: 'scarcity', value: '60' })} // 60 mins
                        className="p-2 rounded bg-orange-900/50 hover:bg-orange-800 border border-orange-500/30 text-xs font-mono text-orange-300"
                    >
                        1 HR TIMER
                    </button>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

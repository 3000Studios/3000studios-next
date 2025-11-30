"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.





  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 flex flex-col items-center luxury-border glass">
      <div className="max-w-3xl w-full mx-auto py-12">
        <h1 className="text-5xl md:text-6xl font-black text-center text-3d mb-8 animate-fade-in-up">

          "use client";
          import { useState } from "react";

          export default function LiveStreamPage() {
            const [isAuth] = useState(false);

            return (
              <div className="min-h-screen bg-black text-white pt-20 px-4 flex flex-col items-center luxury-border glass">
                <div className="max-w-3xl w-full mx-auto py-12">

                  <h1 className="text-5xl md:text-6xl font-black text-center text-3d mb-8">
                    Live Stream
                  </h1>

                  <div className="w-full aspect-video bg-black/80 border-4 border-gold rounded-2xl shadow-2xl flex items-center justify-center mb-8">
                    <span className="text-2xl text-gold font-bold">Live Stream Window</span>
                  </div>

                  <div className="glass p-6 rounded-xl border border-yellow-500/30 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">How to Watch</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg text-platinum">
                      <li>No login required.</li>
                      <li>Recommended browsers: Chrome, Edge, Safari.</li>
                      <li>Streamer RTMP: <span className="text-gold">rtmp://3000studios.com/live</span></li>
                    </ul>
                  </div>

                </div>
              </div>
            );
          }
        </div>
      </div>
    </div>
  );
}

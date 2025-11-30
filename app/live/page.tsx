"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.





  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 flex flex-col items-center luxury-border glass">
      <div className="max-w-3xl w-full mx-auto py-12">
        <h1 className="text-5xl md:text-6xl font-black text-center text-3d mb-8 animate-fade-in-up">
          Live Stream
        </h1>
        <div className="w-full aspect-video bg-black/80 border-4 border-gold rounded-2xl shadow-2xl flex items-center justify-center mb-8 relative overflow-hidden">
          {/* Embed your live stream player here (e.g., video.js, iframe, or custom player) */}
          <span className="text-2xl text-gold font-bold">Live Stream Window</span>
        </div>
        <div className="glass p-6 rounded-xl border border-yellow-500/30 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">How to Watch</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-platinum">
            <li>No login required. This is a public viewer-only stream.</li>
            <li>For best experience, use Chrome, Edge, or Safari on desktop or mobile.</li>
            <li>For creators: Stream using Larix Broadcaster (mobile) or OBS Studio (desktop) to <span className="text-gold font-bold">rtmp://3000studios.com/live</span>.</li>
          </ul>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-4 rounded-xl border border-yellow-500/30">
            <h3 className="font-bold mb-2 text-yellow-400">From Phone</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Download Larix Broadcaster</li>
              <li>Add connection: <span className="text-gold font-bold">rtmp://3000studios.com/live</span></li>
              <li>Start recording</li>
            </ol>
          </div>
          <div className="glass p-4 rounded-xl border border-yellow-500/30">
            <h3 className="font-bold mb-2 text-yellow-400">From Laptop</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Download OBS Studio</li>
              <li>Settings → Stream → Custom</li>
              <li>Server: <span className="text-gold font-bold">rtmp://3000studios.com/live</span></li>
              <li>Start streaming</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

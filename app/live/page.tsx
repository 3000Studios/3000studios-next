"use client";
import { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function LiveStreamPage() {
  const [isAuth] = useState(false);
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986144/3D_tunnel_to_purple_d7cofd.mp4"
          type="video/mp4"
        />
      </video>
      <div className="fixed inset-0 bg-black/50 -z-5"></div>

      <Navigation />

      <div className="flex-1 pt-20 px-4 flex flex-col items-center relative z-10">
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

      <Footer />
    </main>
  );
}

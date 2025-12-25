/**
 * Live Stream Page
 * Viewer-only livestream page for watching broadcasts
 * Features: Video player, chat integration, viewer count
 * Stream control is managed from the Matrix admin panel
 */

'use client';

import { useState, useEffect } from 'react';
import { Users, MessageCircle, Radio } from 'lucide-react';

export default function LivePage() {
  const [viewerCount, setViewerCount] = useState(42);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Simulate viewer count updates
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                Live Stream
              </h1>
              <p className="text-gray-400">
                {isLive ? 'Watch exclusive live content' : 'No live stream currently'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass px-4 py-2 rounded-lg border border-gold flex items-center gap-2">
                <Users className="text-gold" size={20} />
                <span className="text-white font-semibold">{viewerCount}</span>
              </div>
              {isLive && (
                <div className="px-4 py-2 bg-red-600 rounded-lg flex items-center gap-2">
                  <Radio className="text-white animate-pulse" size={20} />
                  <span className="text-white font-semibold">LIVE</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                {isLive ? (
                  <div className="text-center">
                    <Radio className="text-gold mx-auto mb-4 animate-pulse" size={64} />
                    <p className="text-white text-xl font-semibold">Stream is Live</p>
                    <p className="text-gray-400 mt-2">Video player integration coming soon</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">📺</div>
                    <p className="text-white text-xl font-semibold">Stream Offline</p>
                    <p className="text-gray-400 mt-2">Check back later for live content</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  3000 Studios Live
                </h2>
                <p className="text-gray-400">
                  Exclusive behind-the-scenes, Q&A sessions, and special announcements
                </p>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="card h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
                <MessageCircle className="text-gold" size={24} />
                <h3 className="text-xl font-bold text-white">Live Chat</h3>
              </div>
              
              <div className="flex-1 space-y-3 mb-4 overflow-y-auto max-h-96">
                {[
                  { user: 'Viewer123', message: 'Great stream!', time: '2m ago' },
                  { user: 'User456', message: 'When is the next stream?', time: '5m ago' },
                  { user: 'Fan789', message: 'Amazing content 🔥', time: '8m ago' },
                ].map((chat, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gold text-sm font-semibold">{chat.user}</span>
                      <span className="text-gray-500 text-xs">{chat.time}</span>
                    </div>
                    <p className="text-white text-sm">{chat.message}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <input
                  type="text"
                  placeholder="Type a message..."
                  disabled={!isLive}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stream Schedule */}
        <div className="mt-8 card">
          <h3 className="text-2xl font-bold text-white mb-4">Upcoming Streams</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Project Showcase', date: 'Dec 12, 2025', time: '2:00 PM EST' },
              { title: 'Q&A Session', date: 'Dec 15, 2025', time: '5:00 PM EST' },
              { title: 'Special Announcement', date: 'Dec 20, 2025', time: '3:00 PM EST' },
            ].map((stream, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded-lg hover:border hover:border-gold transition-all">
                <h4 className="text-white font-semibold mb-2">{stream.title}</h4>
                <p className="text-gray-400 text-sm">{stream.date}</p>
                <p className="text-gold text-sm">{stream.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>🚀 Live streaming integration with Mux/Agora coming soon</p>
          <p className="mt-2">Stream controls available in Matrix admin panel</p>
        </div>
      </div>
    </div>
  );
}

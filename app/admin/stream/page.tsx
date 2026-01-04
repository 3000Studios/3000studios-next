'use client';

import { brand } from '@/design/brand';
import MuxPlayer from '@mux/mux-player-react';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, Radio, Video } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StreamStudioPage() {
  const [isLive, setIsLive] = useState(false);
  const [streamData, setStreamData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Checking initial status
  useEffect(() => {
    fetch('/api/streaming')
      .then((res) => res.json())
      .then((data) => {
        if (data.isLive) {
          setIsLive(true);
          setStreamData(data);
        }
      });
  }, []);

  const handleGoLive = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/streaming', { method: 'POST' });
      const data = await res.json();
      if (data.streamKey) {
        setStreamData(data);
        setIsLive(true);
      }
    } catch (err) {
      console.error('Failed to start stream', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col gap-6" style={{ overflowY: 'auto' }}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: brand.colors.text.primary }}
          >
            <Radio className={isLive ? 'text-red-500 animate-pulse' : ''} />
            Transmission Control
          </h1>
          <p style={{ color: brand.colors.text.secondary }}>
            Manage live broadcasts and real-time feeds
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/5">
            <div
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
              }`}
            />
            <span className="text-sm font-mono text-gray-400">{isLive ? 'LIVE' : 'OFFLINE'}</span>
          </div>
          <button
            onClick={handleGoLive}
            disabled={isLive || loading}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              isLive
                ? 'bg-red-500/10 text-red-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {loading ? 'Initializing...' : isLive ? 'End Stream' : 'Go Live'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Main Preview Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div
            className="relative aspect-video rounded-xl overflow-hidden border bg-black"
            style={{ borderColor: brand.colors.border.subtle }}
          >
            {streamData?.playbackId ? (
              <MuxPlayer
                streamType="live"
                playbackId={streamData.playbackId}
                metadata={{ video_title: 'Matrix Live Stream' }}
                primaryColor="#FFFFFF"
                secondaryColor="#000000"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col gap-2">
                <Video size={48} />
                <p>Start a stream to generate a Stream Key</p>
              </div>
            )}

            {/* Stream Info Overlay */}
            {isLive && streamData && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10 z-10">
                <div className="text-xs text-gray-400 mb-1">Stream Key</div>
                <div className="font-mono text-white select-all">{streamData.streamKey}</div>
                <div className="text-[10px] text-red-400 mt-1">
                  ⚠ Input this key into OBS to start broadcasting
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Bitrate', value: isLive ? '6,000 Kbps' : '--' },
              { label: 'FPS', value: isLive ? '60' : '--' },
              { label: 'Dropped Frames', value: '0' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-black/20 border border-white/5">
                <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                <div className="text-lg font-mono text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-6">
          {/* Audio Mixer */}
          <div
            className="p-4 rounded-xl border flex-1"
            style={{
              background: brand.colors.bg.elevated,
              borderColor: brand.colors.border.subtle,
            }}
          >
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Mic size={16} /> Audio Mixer
            </h3>
            <div className="space-y-4">
              {['Mic Input', 'Desktop Audio', 'Music Bed'].map((channel, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>{channel}</span>
                    <span>{isLive ? '-6dB' : '-inf'}</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: '0%' }}
                      animate={{ width: isLive ? '70%' : '0%' }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.1,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Preview */}
          <div
            className="p-4 rounded-xl border h-64 flex flex-col"
            style={{
              background: brand.colors.bg.elevated,
              borderColor: brand.colors.border.subtle,
            }}
          >
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={16} /> Live Chat
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {/* Chat messages would go here */}
              <div className="text-xs text-gray-500 italic text-center mt-10">
                Chat is ready to connect...
              </div>
            </div>
            <input
              type="text"
              placeholder="Send message..."
              className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

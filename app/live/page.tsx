'use client';

import { useEffect, useState } from 'react';

interface StreamStatus {
  isLive: boolean;
  title: string;
  description: string;
  viewers: number;
  streamUrl: string;
}

export default function LivePage() {
  const [status, setStatus] = useState<StreamStatus>({
    isLive: false,
    title: '',
    description: '',
    viewers: 0,
    streamUrl: '',
  });

  useEffect(() => {
    // Poll for stream status
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/live/status');
        const data = await response.json();
        setStatus({
          isLive: data.config?.status === 'live',
          title: data.config?.title || '3000 Studios Live',
          description: data.config?.description || '',
          viewers: data.config?.viewers || 0,
          streamUrl: data.config?.streamUrl || '',
        });
      } catch (error) {
        console.error('Failed to fetch stream status:', error);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-amber-400/20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
            {status.title}
          </h1>
          {status.isLive && (
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold">LIVE</span>
              </div>
              <div className="text-slate-400">
                {status.viewers} {status.viewers === 1 ? 'viewer' : 'viewers'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {status.isLive ? (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-slate-950 rounded-xl border-2 border-amber-400/20 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                {status.streamUrl ? (
                  <iframe
                    src={status.streamUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-slate-500">Loading stream...</div>
                )}
              </div>
            </div>

            {/* Stream Info */}
            {status.description && (
              <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
                <h2 className="text-xl font-bold mb-4">About this stream</h2>
                <p className="text-slate-300">{status.description}</p>
              </div>
            )}

            {/* Chat (Placeholder) */}
            <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
              <h2 className="text-xl font-bold mb-4">Live Chat</h2>
              <div className="h-64 bg-slate-950 rounded-lg flex items-center justify-center">
                <p className="text-slate-500">Chat coming soon</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-xl border-2 border-amber-400/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-6">📹</div>
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Stream Offline
              </h2>
              <p className="text-slate-400 text-lg">
                No live stream at the moment. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface StreamConfig {
  title: string;
  description: string;
  status: 'offline' | 'starting' | 'live' | 'stopping';
  viewers: number;
  streamKey: string;
  streamUrl: string;
}

export default function LiveStreamControl() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [config, setConfig] = useState<StreamConfig>({
    title: '3000 Studios Live',
    description: '',
    status: 'offline',
    viewers: 0,
    streamKey: '',
    streamUrl: '',
  });
  const [health, setHealth] = useState({
    bitrate: 0,
    fps: 0,
    dropped: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  useEffect(() => {
    // Poll stream status
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/live/status');
        const data = await response.json();
        setConfig((prev) => ({ ...prev, ...data.config }));
        setHealth(data.health || health);
      } catch (error) {
        console.error('Failed to fetch stream status:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartStream = async () => {
    try {
      setConfig((prev) => ({ ...prev, status: 'starting' }));
      const response = await fetch('/api/live/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: config.title,
          description: config.description,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setConfig((prev) => ({
          ...prev,
          status: 'live',
          streamKey: data.streamKey,
          streamUrl: data.streamUrl,
        }));
      }
    } catch (error) {
      console.error('Failed to start stream:', error);
      setConfig((prev) => ({ ...prev, status: 'offline' }));
    }
  };

  const handleStopStream = async () => {
    try {
      setConfig((prev) => ({ ...prev, status: 'stopping' }));
      await fetch('/api/live/stop', { method: 'POST' });
      setConfig((prev) => ({ ...prev, status: 'offline', viewers: 0 }));
    } catch (error) {
      console.error('Failed to stop stream:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-8">
          Live Stream Control
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stream Configuration */}
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
            <h2 className="text-2xl font-bold mb-6">Stream Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Stream Title
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                  disabled={config.status !== 'offline'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                  disabled={config.status !== 'offline'}
                />
              </div>

              <div className="pt-4">
                {config.status === 'offline' ? (
                  <button
                    onClick={handleStartStream}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all"
                  >
                    Start Stream
                  </button>
                ) : (
                  <button
                    onClick={handleStopStream}
                    disabled={config.status !== 'live'}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-lg hover:from-red-400 hover:to-rose-500 transition-all disabled:opacity-50"
                  >
                    {config.status === 'live' ? 'Stop Stream' : config.status.toUpperCase()}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stream Status & Health */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
              <h2 className="text-2xl font-bold mb-6">Status</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span
                    className={`text-xl font-bold ${
                      config.status === 'live'
                        ? 'text-green-400'
                        : config.status === 'offline'
                          ? 'text-slate-400'
                          : 'text-amber-400'
                    }`}
                  >
                    {config.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Viewers:</span>
                  <span className="text-xl font-bold text-white">{config.viewers}</span>
                </div>

                {config.status === 'live' && config.streamUrl && (
                  <div>
                    <span className="text-slate-400 block mb-2">Stream URL:</span>
                    <code className="block p-2 bg-slate-900 rounded text-sm text-amber-400 break-all">
                      {config.streamUrl}
                    </code>
                  </div>
                )}
              </div>
            </div>

            {/* Health Indicators */}
            {config.status === 'live' && (
              <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
                <h2 className="text-2xl font-bold mb-6">Stream Health</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Bitrate:</span>
                    <span className="text-white">{health.bitrate} kbps</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">FPS:</span>
                    <span className="text-white">{health.fps}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Dropped Frames:</span>
                    <span className={health.dropped > 100 ? 'text-red-400' : 'text-green-400'}>
                      {health.dropped}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Window */}
        {config.status !== 'offline' && (
          <div className="mt-8 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <p className="text-slate-500">Stream preview will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

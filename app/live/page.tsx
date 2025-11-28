"use client";
import { useState } from "react";

export default function LiveStreamPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === "Bossman3000!!!") {
      setIsAuth(true);
      setErr("");
    } else {
      setErr("Access Denied");
      setPwd("");
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div className="glass p-8 rounded-2xl border-2 border-yellow-500 max-w-md w-full">
          <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
            LIVE STREAMING
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-yellow-600 rounded text-white"
              placeholder="Admin Password"
              autoFocus
            />
            {err && (
              <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-center">
                {err}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded font-bold"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Live Streaming Dashboard
        </h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              Settings
            </h2>
            <div className="flex items-center justify-between p-4 bg-black/50 rounded mb-4">
              <span>Public Stream</span>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={
                  isPublic
                    ? "px-4 py-2 bg-green-500 rounded"
                    : "px-4 py-2 bg-gray-600 rounded"
                }
              >
                {isPublic ? "ON" : "OFF"}
              </button>
            </div>
            <div className="p-4 bg-black/50 rounded">
              <h3 className="font-bold mb-2">Stream Key</h3>
              <code className="px-3 py-2 bg-black border border-yellow-600 rounded text-yellow-400 text-sm block">
                shadow-stream-{Date.now()}
              </code>
            </div>
          </div>
          <div className="glass p-6 rounded-xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              How to Stream
            </h2>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-black/50 rounded">
                <h3 className="font-bold mb-2">From Phone</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Download Larix Broadcaster</li>
                  <li>Add connection: rtmp://3000studios.com/live</li>
                  <li>Start recording</li>
                </ol>
              </div>
              <div className="p-4 bg-black/50 rounded">
                <h3 className="font-bold mb-2">From Laptop</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Download OBS Studio</li>
                  <li>Settings → Stream → Custom</li>
                  <li>Server: rtmp://3000studios.com/live</li>
                  <li>Start streaming</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

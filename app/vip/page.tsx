'use client';

import { useState } from 'react';

export default function VIPPage() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');

  async function sendCommand() {
    setStatus('Sending command...');

    const res = await fetch('/api/vip/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    setStatus(data.ok ? 'Command accepted' : data.error);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">VIP Command Center</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Say or type a command..."
        className="w-full h-40 p-4 bg-zinc-900 border border-zinc-700 rounded text-white"
      />

      <button
        onClick={sendCommand}
        className="mt-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
      >
        Execute
      </button>

      {status && <div className="mt-4 text-sm text-yellow-300">{status}</div>}
    </div>
  );
}

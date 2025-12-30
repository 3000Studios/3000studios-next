'use client';

/**
 * VOICE COMMAND LOG VIEWER
 * Admin dashboard showing all voice commands executed
 */

import { useEffect, useState } from 'react';

interface VoiceLogEntry {
  id: string;
  timestamp: string;
  command: string;
  input: Record<string, any>;
  output: {
    status: string;
    message: string;
    mutationId?: string;
  };
  duration: number;
}

export default function VoiceLogsPage() {
  const [logs, setLogs] = useState<VoiceLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/admin/voice-logs?limit=100');
        const data = await response.json();
        setLogs(data.logs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    // Refresh every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClearLogs = async () => {
    if (!confirm('Clear all voice command logs?')) return;

    try {
      await fetch('/api/admin/voice-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' }),
      });
      setLogs([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear logs');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading logs...</div>;
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Voice Command Logs</h1>
          <button
            onClick={handleClearLogs}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Clear Logs
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        {logs.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl">No voice commands executed yet.</p>
            <p className="text-sm mt-2">Send commands to /api/voice to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">Total: {logs.length} commands</p>
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-bold text-lg">{log.command}</p>
                    <p className="text-gray-500 text-sm">{log.id}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded text-sm font-bold ${
                        log.output.status === 'ok'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {log.output.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Timestamp</p>
                    <p className="text-white font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Duration</p>
                    <p className="text-white font-mono">{log.duration}ms</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-white font-bold mb-2">{log.output.message}</p>
                  {log.output.mutationId && (
                    <p className="text-gray-400 text-sm">ID: {log.output.mutationId}</p>
                  )}
                </div>

                {Object.keys(log.input).length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-400 text-xs uppercase mb-2">Input</p>
                    <pre className="bg-black p-3 rounded text-gray-400 text-xs overflow-x-auto">
                      {JSON.stringify(log.input, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

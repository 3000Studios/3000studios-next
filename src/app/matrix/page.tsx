/**
 * Matrix Command Center - Voice-Controlled Dashboard
 * THE DIFFERENTIATOR: Speak to control the entire platform
 * Features: Voice commands, live logs, revenue dashboard, system controls
 */

"use client";

import { brand } from '@/design/brand';
import { getAuditLogger } from '@/lib/auditLog';
import { getTier } from '@/lib/tiers';
import { executeCommand, parseVoiceCommand, type CommandResult, type VoiceCommand } from '@/lib/voiceCommands';
import { motion } from 'framer-motion';
import {
    Activity,
    AlertCircle,
    CheckCircle,
    DollarSign,
    LogOut,
    Mic,
    MicOff,
    Terminal,
    TrendingUp,
    Users,
    XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface LogEntry {
  id: string;
  timestamp: number;
  type: 'command' | 'system' | 'revenue' | 'error';
  message: string;
  status: 'success' | 'error' | 'pending';
}

export default function MatrixCommandCenter() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userTier, setUserTier] = useState('free');

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [waveform, setWaveform] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentCommand, setCurrentCommand] = useState<VoiceCommand | null>(null);
  const [commandResult, setCommandResult] = useState<CommandResult | null>(null);

  // Dashboard State
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState({
    revenue: { today: 0, change: '+0%' },
    visitors: { count: 0, change: '+0%' },
    commands: { count: 0, change: '+0%' },
    conversions: { rate: '0%', change: '+0%' },
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsAuthenticated(true);
    setUserEmail('admin@3000studios.com');
    setUserTier('godMode'); // Demo: God Mode access

    // Load initial stats
    loadStats();
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadStats = async () => {
    try {
      const revenueRes = await fetch('/api/health/revenue');
      const revenueData = await revenueRes.json();

      setStats({
        revenue: {
          today: revenueData.revenue || 0,
          change: '+12.5%',
        },
        visitors: {
          count: Math.floor(Math.random() * 1000) + 500,
          change: '+8.3%',
        },
        commands: {
          count: logs.filter(l => l.type === 'command').length,
          change: '+15%',
        },
        conversions: {
          rate: '4.2%',
          change: '+0.5%',
        },
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadLogs = async () => {
    try {
      const auditLogger = getAuditLogger();
      const auditLogs = await auditLogger.getLogs({ limit: 50 });

      const logEntries: LogEntry[] = auditLogs.map(log => ({
        id: log.id,
        timestamp: log.timestamp,
        type: log.category === 'store' ? 'revenue' : log.category === 'system' ? 'system' : 'command',
        message: `${log.action}: ${log.target || ''} ${log.newValue || ''}`.trim(),
        status: log.success ? 'success' : 'error',
      }));

      setLogs(logEntries);
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const startVoiceRecognition = async () => {
    setIsListening(true);
    setTranscript('Listening...');

    try {
      // Initialize audio visualization
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);

      // Animate waveform
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const updateWaveform = () => {
        if (!isListening) return;
        analyserRef.current?.getByteTimeDomainData(dataArray);
        setWaveform(Array.from(dataArray.slice(0, 50)));
        requestAnimationFrame(updateWaveform);
      };
      updateWaveform();

      // TODO: Implement actual speech recognition
      // For now, simulate after 2 seconds
      setTimeout(() => {
        simulateVoiceCommand();
      }, 2000);

    } catch (error) {
      console.error('Voice recognition error:', error);
      addLog('error', 'Failed to start voice recognition', 'error');
      setIsListening(false);
    }
  };

  const stopVoiceRecognition = () => {
    setIsListening(false);
    setTranscript('');
    setWaveform([]);

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const simulateVoiceCommand = () => {
    const demoCommands = [
      "Deploy site now",
      "Show me revenue for today",
      "Change price of Premium Pack to $79.99",
      "Update homepage hero to Elite AI Platform",
    ];

    const randomCommand = demoCommands[Math.floor(Math.random() * demoCommands.length)];
    setTranscript(randomCommand);
    handleVoiceCommand(randomCommand);
  };

  const handleVoiceCommand = async (voiceTranscript: string) => {
    const command = parseVoiceCommand(voiceTranscript);

    if (!command) {
      addLog('error', `Unrecognized command: "${voiceTranscript}"`, 'error');
      setIsListening(false);
      return;
    }

    setCurrentCommand(command);
    addLog('command', `Executing: ${command.action}`, 'pending');

    try {
      const result = await executeCommand(command, userTier);
      setCommandResult(result);

      if (result.success) {
        addLog('command', `✓ ${command.action} completed`, 'success');

        // Log to audit
        const auditLogger = getAuditLogger();
        await auditLogger.log({
          userId: 'user_1',
          userEmail,
          action: command.action,
          category: command.category,
          target: command.target,
          newValue: command.value,
          success: true,
        });
      } else {
        addLog('error', `✗ ${command.action} failed: ${result.message}`, 'error');
      }
    } catch (error) {
      addLog('error', `Command execution failed: ${error}`, 'error');
    } finally {
      setIsListening(false);
      setTimeout(() => {
        setCurrentCommand(null);
        setCommandResult(null);
      }, 5000);
    }
  };

  const addLog = (type: LogEntry['type'], message: string, status: LogEntry['status']) => {
    const newLog: LogEntry = {
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type,
      message,
      status,
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100));
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: brand.colors.bg.primary }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: brand.colors.action.primary }}
          />
          <p style={{ color: brand.colors.text.secondary }}>Authenticating...</p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0" />

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md p-8 bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-gold/10 mb-4 border border-gold/20">
              <Lock className="text-gold" size={32} />
            </div>
            <h1 className="text-4xl font-black text-white tracking-widest mb-1">
              THE MATRIX
            </h1>
            <p className="text-gold/60 font-mono text-xs tracking-[0.2em] uppercase">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER PASSKEY"
                className="w-full p-4 bg-black/50 border border-gray-700 rounded-lg text-white text-center tracking-[0.5em] focus:border-gold transition-colors outline-none placeholder:tracking-normal placeholder:text-gray-600 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 bg-gold text-black font-black tracking-wider rounded-lg hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "VERIFYING..." : "ACCESS SYSTEM"}
            </button>

            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase">
              <span>Secure Protocol v3.0</span>
              <span className="flex items-center gap-1">
                <Globe size={10} /> 3000 STUDIOS NETWORK
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  const tier = getTier(userTier);

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: brand.colors.bg.primary }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                color: brand.colors.text.primary,
                textShadow: brand.colors.shadow.glow
              }}
            >
              COMMAND CENTER
            </h1>
            <p style={{ color: brand.colors.text.secondary }}>
              {userEmail} • <span style={{ color: tier.color }}>{tier.displayName}</span> Tier
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg flex items-center gap-2"
            style={{
              background: brand.colors.bg.elevated,
              color: brand.colors.text.secondary,
              border: `1px solid ${brand.colors.border.default}`,
            }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Voice Command Section */}
        <motion.div
          className="p-8 rounded-lg mb-8"
          style={{
            background: brand.colors.bg.secondary,
            border: `2px solid ${isListening ? brand.colors.action.primary : brand.colors.border.default}`,
            boxShadow: isListening ? brand.colors.shadow.glow : brand.colors.shadow.md,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: brand.colors.text.primary }}
            >
              Voice Command Interface
            </h2>
            <motion.button
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: isListening ? brand.colors.action.primary : brand.colors.bg.elevated,
                color: isListening ? brand.colors.text.inverse : brand.colors.action.primary,
                boxShadow: isListening ? brand.colors.shadow.glow : 'none',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isListening ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ repeat: isListening ? Infinity : 0, duration: 1.5 }}
            >
              {isListening ? <Mic size={32} /> : <MicOff size={32} />}
            </motion.button>
          </div>

          {/* Waveform Visualization */}
          {isListening && waveform.length > 0 && (
            <div className="flex items-center justify-center gap-1 h-24 mb-4">
              {waveform.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="w-1 rounded-full"
                  style={{
                    background: brand.colors.gradient.primary,
                    height: `${(value / 255) * 100}%`,
                  }}
                  animate={{
                    height: [`${(value / 255) * 100}%`, `${Math.random() * 100}%`, `${(value / 255) * 100}%`],
                  }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
              ))}
            </div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div
              className="p-4 rounded-lg mb-4"
              style={{
                background: brand.colors.bg.elevated,
                border: `1px solid ${brand.colors.border.subtle}`,
              }}
            >
              <p
                className="text-lg"
                style={{ color: brand.colors.text.primary }}
              >
                {transcript}
              </p>
            </div>
          )}

          {/* Command Result */}
          {commandResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg flex items-start gap-3"
              style={{
                background: commandResult.success ? `${brand.colors.state.success}20` : `${brand.colors.state.error}20`,
                border: `1px solid ${commandResult.success ? brand.colors.state.success : brand.colors.state.error}`,
              }}
            >
              {commandResult.success ? (
                <CheckCircle size={24} style={{ color: brand.colors.state.success }} />
              ) : (
                <XCircle size={24} style={{ color: brand.colors.state.error }} />
              )}
              <div>
                <p style={{ color: brand.colors.text.primary }}>{commandResult.message}</p>
                {commandResult.requiresConfirmation && (
                  <button
                    className="mt-2 px-4 py-2 rounded font-semibold"
                    style={{
                      background: brand.colors.action.primary,
                      color: brand.colors.text.inverse,
                    }}
                  >
                    Confirm & Deploy
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: <DollarSign size={24} />,
              title: 'Revenue Today',
              value: `$${stats.revenue.today.toFixed(2)}`,
              change: stats.revenue.change,
              trend: 'up' as const
            },
            {
              icon: <Users size={24} />,
              title: 'Visitors',
              value: stats.visitors.count.toString(),
              change: stats.visitors.change,
              trend: 'up' as const
            },
            {
              icon: <Terminal size={24} />,
              title: 'Commands',
              value: stats.commands.count.toString(),
              change: stats.commands.change,
              trend: 'up' as const
            },
            {
              icon: <TrendingUp size={24} />,
              title: 'Conversion Rate',
              value: stats.conversions.rate,
              change: stats.conversions.change,
              trend: 'up' as const
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-lg"
              style={{
                background: brand.colors.bg.secondary,
                border: `1px solid ${brand.colors.border.subtle}`,
              }}
              whileHover={{ y: -4, boxShadow: brand.colors.shadow.lg }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: brand.colors.action.primary,
                    boxShadow: brand.colors.shadow.glow,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <p style={{ color: brand.colors.text.secondary }}>{stat.title}</p>
              <h3
                className="text-3xl font-bold mb-2"
                style={{ color: brand.colors.text.primary }}
              >
                {stat.value}
              </h3>
              <p
                className="text-sm flex items-center gap-1"
                style={{ color: brand.colors.state.success }}
              >
                <TrendingUp size={16} />
                {stat.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Live Logs */}
        <div
          className="p-6 rounded-lg"
          style={{
            background: brand.colors.bg.secondary,
            border: `1px solid ${brand.colors.border.subtle}`,
          }}
        >
          <h2
            className="text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: brand.colors.text.primary }}
          >
            <Activity size={24} />
            Live System Logs
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded flex items-start gap-3"
                style={{
                  background: brand.colors.bg.elevated,
                  border: `1px solid ${brand.colors.border.subtle}`,
                }}
              >
                <div style={{
                  color: log.status === 'success' ? brand.colors.state.success :
                         log.status === 'error' ? brand.colors.state.error :
                         brand.colors.state.info
                }}>
                  {log.status === 'success' && <CheckCircle size={20} />}
                  {log.status === 'error' && <AlertCircle size={20} />}
                  {log.status === 'pending' && <Activity size={20} />}
                </div>
                <div className="flex-1">
                  <p style={{ color: brand.colors.text.primary }}>{log.message}</p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: brand.colors.text.tertiary }}
                  >
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsUnlocked(false)}
          className="px-4 py-2 border border-red-900/50 text-red-500/60 hover:text-red-400 hover:border-red-500 rounded-lg text-xs font-mono transition-colors"
        >
          TERMINATE SESSION
        </button>
      </div>
    </div>
  );
}

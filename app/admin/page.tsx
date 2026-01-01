'use client';

import VideoBackground from '@/components/VideoBackground';
import {
  AlertCircle,
  BarChart3,
  Building2,
  Code2,
  DollarSign,
  FileText,
  Gauge,
  Lock,
  Mic,
  Radio,
  Settings,
  Tv,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Admin password - in production this should be environment variable
const ADMIN_PASSWORD = '88888888';

const ADMIN_SECTIONS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: Gauge, desc: 'Overview & analytics' },
  {
    label: 'Command Center',
    href: '/admin/command-center',
    icon: Building2,
    desc: 'Central control hub',
  },
  { label: 'Revenue', href: '/admin/revenue', icon: DollarSign, desc: 'Monetization & earnings' },
  { label: 'Builder', href: '/admin/builder', icon: Code2, desc: 'Page & component builder' },
  { label: 'Editor', href: '/admin/editor', icon: FileText, desc: 'Content editor' },
  { label: 'Content', href: '/admin/content', icon: FileText, desc: 'Manage content' },
  { label: 'Stats', href: '/admin/stats', icon: BarChart3, desc: 'Statistics & metrics' },
  { label: 'Stream', href: '/admin/stream', icon: Tv, desc: 'Live streaming' },
  { label: 'Voice Logs', href: '/admin/voice-logs', icon: Mic, desc: 'Voice command history' },
  { label: 'Voice Remote', href: '/admin/voice-remote', icon: Radio, desc: 'Remote voice control' },
  { label: 'Control', href: '/admin/control', icon: Settings, desc: 'System controls' },
  { label: 'Settings', href: '/admin/settings', icon: Settings, desc: 'Configuration' },
];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <VideoBackground opacity={0.2} />
        <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-linear-to-r from-[#FFD700] to-[#D4AF37] rounded-full blur-3xl opacity-10 animate-pulse" />

        <div className="relative z-10 max-w-md w-full p-8">
          <div className="backdrop-blur-md bg-white/5 border border-[#D4AF37]/30 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-black" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">Admin Access</h1>
              <p className="text-gray-400 text-sm">Enter password to access the admin panel</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all hover:scale-105"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">Admin Panel</h1>
          <p className="text-gray-400">Welcome, Boss Man J! Select a section below:</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group block bg-gray-900/50 border border-[#D4AF37]/20 rounded-xl p-6 hover:border-[#D4AF37]/60 hover:bg-gray-900/70 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/30 transition-colors">
                  <Icon className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {section.label}
                </h3>
              </div>
              <p className="text-gray-500 text-sm">{section.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gray-900/50 border border-[#D4AF37]/20 rounded-xl">
        <h3 className="text-lg font-bold text-[#D4AF37] mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/command-center"
            className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#FFD700] transition-colors"
          >
            🎛️ Command Center
          </Link>
          <Link
            href="/admin/revenue"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            💰 Revenue Dashboard
          </Link>
          <Link
            href="/admin/voice-remote"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            🎤 Voice Control
          </Link>
        </div>
      </div>
    </div>
  );
}

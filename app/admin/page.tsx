'use client';

import VideoBackground from '@/components/VideoBackground';
import {
  AlertCircle,
  Building2,
  Code2,
  DollarSign,
  Eye,
  FileText,
  Gauge,
  Globe,
  Lock,
  Mic,
  Radio,
  Settings,
  ShoppingBag,
  Tv,
  Upload,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Admin password - in production this should be environment variable
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '88888888';

// Admin sections organized by category
const ADMIN_SECTIONS = {
  main: [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: Gauge,
      desc: 'Overview & analytics',
      color: 'bg-blue-600',
    },
    {
      label: 'Command Center',
      href: '/admin/command-center',
      icon: Building2,
      desc: 'Central control hub',
      color: 'bg-purple-600',
    },
    {
      label: 'Revenue',
      href: '/admin/revenue',
      icon: DollarSign,
      desc: 'Monetization & earnings',
      color: 'bg-green-600',
    },
  ],
  content: [
    {
      label: 'Content Upload',
      href: '/admin/content',
      icon: Upload,
      desc: 'Upload files & assets',
      color: 'bg-orange-600',
    },
    {
      label: 'Editor',
      href: '/admin/editor',
      icon: FileText,
      desc: 'Content editor',
      color: 'bg-pink-600',
    },
    {
      label: 'Builder',
      href: '/admin/builder',
      icon: Code2,
      desc: 'Page & component builder',
      color: 'bg-indigo-600',
    },
  ],
  media: [
    {
      label: 'Live Stream',
      href: '/admin/stream',
      icon: Tv,
      desc: 'Stream setup & controls',
      color: 'bg-red-600',
    },
    {
      label: 'Store Manager',
      href: '/admin/stats',
      icon: ShoppingBag,
      desc: 'Products & inventory',
      color: 'bg-amber-600',
    },
  ],
  voice: [
    {
      label: 'Voice Command Center',
      href: '/admin/voice-remote',
      icon: Radio,
      desc: 'AI voice control',
      color: 'bg-cyan-600',
    },
    {
      label: 'Voice Logs',
      href: '/admin/voice-logs',
      icon: Mic,
      desc: 'Command history',
      color: 'bg-teal-600',
    },
  ],
  system: [
    {
      label: 'Control',
      href: '/admin/control',
      icon: Settings,
      desc: 'System controls',
      color: 'bg-gray-600',
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      desc: 'Configuration',
      color: 'bg-slate-600',
    },
  ],
};

// Mock site statistics - in production these would come from an API
const SITE_STATS = [
  { label: 'Total Visitors', value: '12,847', change: '+23%', icon: Users, color: 'text-blue-400' },
  { label: 'Page Views', value: '48,293', change: '+18%', icon: Eye, color: 'text-green-400' },
  { label: 'Revenue', value: '$4,820', change: '+32%', icon: DollarSign, color: 'text-yellow-400' },
  { label: 'Active Sessions', value: '847', change: '+12%', icon: Globe, color: 'text-purple-400' },
];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

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
        <VideoBackground
          src="https://res.cloudinary.com/dj92eb97f/video/upload/v1766986106/golfing_pvhbv5.mp4"
          opacity={0.2}
        />
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
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome, Boss Man J! • {currentTime}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-500/30 rounded-lg">
            <Zap size={16} className="text-green-400" />
            <span className="text-green-400 text-sm">All Systems Online</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Site Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {SITE_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={stat.color} size={20} />
                <span className="text-green-400 text-xs">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Sections */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Gauge size={20} className="text-[#D4AF37]" />
          Main Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ADMIN_SECTIONS.main.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group block bg-gray-900/50 border border-[#D4AF37]/20 rounded-xl p-6 hover:border-[#D4AF37]/60 hover:bg-gray-900/70 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {section.label}
                    </h3>
                    <p className="text-gray-500 text-sm">{section.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content & Media Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Content Management */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Upload size={20} className="text-orange-400" />
            Content Management
          </h2>
          <div className="space-y-3">
            {ADMIN_SECTIONS.content.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#D4AF37]/40 transition-all"
                >
                  <div
                    className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37]">
                      {section.label}
                    </h3>
                    <p className="text-gray-500 text-sm">{section.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Media & Streaming */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Tv size={20} className="text-red-400" />
            Media & Streaming
          </h2>
          <div className="space-y-3">
            {ADMIN_SECTIONS.media.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#D4AF37]/40 transition-all"
                >
                  <div
                    className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37]">
                      {section.label}
                    </h3>
                    <p className="text-gray-500 text-sm">{section.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Voice & System Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Voice Control */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Radio size={20} className="text-cyan-400" />
            AI Voice Control
          </h2>
          <div className="space-y-3">
            {ADMIN_SECTIONS.voice.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#D4AF37]/40 transition-all"
                >
                  <div
                    className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37]">
                      {section.label}
                    </h3>
                    <p className="text-gray-500 text-sm">{section.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* System Settings */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Settings size={20} className="text-gray-400" />
            System Settings
          </h2>
          <div className="space-y-3">
            {ADMIN_SECTIONS.system.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#D4AF37]/40 transition-all"
                >
                  <div
                    className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37]">
                      {section.label}
                    </h3>
                    <p className="text-gray-500 text-sm">{section.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-gray-900/50 border border-[#D4AF37]/20 rounded-xl">
        <h3 className="text-lg font-bold text-[#D4AF37] mb-4">⚡ Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/command-center"
            className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#FFD700] transition-colors"
          >
            🎛️ Command Center
          </Link>
          <Link
            href="/admin/content"
            className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            📤 Upload Content
          </Link>
          <Link
            href="/admin/stream"
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            📺 Live Stream Setup
          </Link>
          <Link
            href="/admin/voice-remote"
            className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
          >
            🎤 Voice Control
          </Link>
          <Link
            href="/admin/revenue"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            💰 Revenue
          </Link>
        </div>
      </div>
    </div>
  );
}

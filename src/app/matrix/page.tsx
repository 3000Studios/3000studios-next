/**
 * Matrix Admin Dashboard
 * Central command center for site administration  
 * Features: Analytics, site management, voice-to-code editor integration points
 * Access: Protected - requires authentication (mr.jwswain@gmail.com / Bossman3000!!!)
 * 
 * This is THE MATRIX - the admin control center that contains:
 * - Voice-to-code editor (foundation)
 * - Analytics dashboard
 * - Store management
 * - Live stream controls
 * - Avatar controller
 * - All admin tools
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp,
  Settings,
  Package,
  Video,
  Edit3,
  Activity,
  ShoppingCart,
  Eye,
  Zap,
  LogOut,
  Mic,
  Code,
  Rocket,
  GitBranch
} from 'lucide-react';
import { verifySessionToken } from '@/lib/auth';
import Link from 'next/link';
import VoiceCodeEditor from './components/VoiceCodeEditor';
import StreamControl from './components/StreamControl';
import RealAnalytics from './components/RealAnalytics';
import ContentGenerator from './components/ContentGenerator';
import { CompactRealtimeSync } from '@/app/components/RealtimeSync';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { forceRedeploy } from '@/lib/services/realtime-sync';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp size={16} className={trend === 'down' ? 'rotate-180' : ''} />
        <span className="ml-1">{change} from last month</span>
      </div>
    </div>
  );
}

export default function MatrixPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const { refreshStatus } = useRealtimeSync();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const result = verifySessionToken(token);
    if (!result.success) {
      localStorage.removeItem('auth_token');
      router.push('/login');
      return;
    }

    setIsAuthenticated(true);
    setUserEmail(result.user?.email || '');
    setIsLoading(false);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  const handleForceDeploy = async () => {
    setIsDeploying(true);
    try {
      await forceRedeploy();
      await refreshStatus();
    } catch (error) {
      console.error('Force deploy failed:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg">Accessing THE MATRIX...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              THE MATRIX
            </h1>
            <p className="text-gray-400">
              Command Center • All Systems Online • Welcome, {userEmail.split('@')[0]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2 rounded-lg border border-gold">
              <p className="text-sm text-gray-300">{currentTime}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 glass border border-red-500 rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-2"
              title="Logout"
            >
              <LogOut className="text-red-500" size={20} />
              <span className="text-red-500 text-sm hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Real-Time Deployment Status - NEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Rocket className="text-gold" size={24} />
                  <h2 className="text-xl font-bold text-white">🚀 Real-Time Deployment</h2>
                </div>
                <button
                  onClick={handleForceDeploy}
                  disabled={isDeploying}
                  className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-lg hover:from-platinum hover:to-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Zap size={16} />
                  {isDeploying ? 'Deploying...' : 'Deploy Now'}
                </button>
              </div>
              <CompactRealtimeSync />
              <div className="mt-4 p-3 glass border border-cyan-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="text-cyan-400" size={16} />
                  <p className="text-sm font-semibold text-cyan-400">Production Branch</p>
                </div>
                <p className="text-2xl font-bold text-white">main</p>
                <p className="text-xs text-gray-400 mt-1">
                  ✅ Single source of truth - All changes deploy directly to production
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">⚡ Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/matrix#voice-editor'}
                className="w-full p-3 glass border border-gold/30 rounded-lg hover:bg-gold/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Mic className="text-gold" size={20} />
                  <div>
                    <p className="text-white font-semibold">Voice Command</p>
                    <p className="text-xs text-gray-400">Deploy with voice</p>
                  </div>
                </div>
              </button>
              <button 
                onClick={handleForceDeploy}
                disabled={isDeploying}
                className="w-full p-3 glass border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-all text-left disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Rocket className="text-green-400" size={20} />
                  <div>
                    <p className="text-white font-semibold">Force Redeploy</p>
                    <p className="text-xs text-gray-400">Redeploy current state</p>
                  </div>
                </div>
              </button>
              <a 
                href="https://github.com/3000Studios/3000studios-next"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 glass border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-all text-left block"
              >
                <div className="flex items-center gap-3">
                  <Code className="text-purple-400" size={20} />
                  <div>
                    <p className="text-white font-semibold">View Repository</p>
                    <p className="text-xs text-gray-400">GitHub main branch</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$12,450"
            change="+23.5%"
            icon={<DollarSign className="text-black" size={24} />}
            trend="up"
          />
          <StatCard
            title="Active Users"
            value="1,284"
            change="+12.3%"
            icon={<Users className="text-black" size={24} />}
            trend="up"
          />
          <StatCard
            title="Store Orders"
            value="324"
            change="+8.1%"
            icon={<ShoppingCart className="text-black" size={24} />}
            trend="up"
          />
          <StatCard
            title="Live Viewers"
            value="42"
            change="-5.2%"
            icon={<Eye className="text-black" size={24} />}
            trend="down"
          />
        </div>

        {/* Voice-to-Code Editor - FULL IMPLEMENTATION */}
        <VoiceCodeEditor />

        {/* Stream Control - WebRTC Live Streaming */}
        <StreamControl />

        {/* Content Generator - AI Blog & Product Descriptions */}
        <ContentGenerator />

        {/* Real Analytics from MongoDB */}
        <RealAnalytics />
      </div>
    </div>
  );
}

/**
 * Matrix Admin Dashboard
 * Central command center for site administration
 * Features: Analytics, site management, voice-to-code editor integration points
 * Access: Protected - requires authentication
 * 
 * CUSTOMIZATION SECTIONS:
 * - Stats cards: Update numbers/metrics as needed
 * - Quick actions: Add/remove admin functions
 * - Dashboard widgets: Customize displayed information
 */

'use client';

import { useState, useEffect } from 'react';
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
  Zap
} from 'lucide-react';
import Link from 'next/link';

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
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
              Command Center • All Systems Online
            </p>
          </div>
          <div className="glass px-4 py-2 rounded-lg border border-gold">
            <p className="text-sm text-gray-300">{currentTime}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
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

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="text-gold" size={24} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all hover:shadow-lg hover:border hover:border-gold">
              <Edit3 className="text-gold" size={24} />
              <span className="text-sm text-white">Voice Editor</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all hover:shadow-lg hover:border hover:border-gold">
              <Package className="text-gold" size={24} />
              <span className="text-sm text-white">Store Manager</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all hover:shadow-lg hover:border hover:border-gold">
              <Video className="text-gold" size={24} />
              <span className="text-sm text-white">Stream Control</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all hover:shadow-lg hover:border hover:border-gold">
              <Activity className="text-gold" size={24} />
              <span className="text-sm text-white">Analytics</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all hover:shadow-lg hover:border hover:border-gold">
              <BarChart3 className="text-gold" size={24} />
              <span className="text-sm text-white">Reports</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-all hover:shadow-lg hover:border hover:border-gold">
              <Settings className="text-gold" size={24} />
              <span className="text-sm text-white">Settings</span>
            </button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New order received', time: '2 minutes ago', type: 'order' },
                { action: 'User registered', time: '15 minutes ago', type: 'user' },
                { action: 'Blog post published', time: '1 hour ago', type: 'content' },
                { action: 'Live stream started', time: '2 hours ago', type: 'stream' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span className="text-white text-sm">{item.action}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
            <div className="space-y-4">
              {[
                { name: 'Web Server', status: 'Online', uptime: '99.9%' },
                { name: 'Database', status: 'Online', uptime: '100%' },
                { name: 'Payment Gateway', status: 'Online', uptime: '99.8%' },
                { name: 'Live Stream Service', status: 'Online', uptime: '98.5%' },
              ].map((service, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 text-xs mr-2">{service.status}</span>
                    <span className="text-gray-500 text-xs">{service.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="card bg-gradient-to-r from-gold/10 to-sapphire/10 border-gold">
          <h2 className="text-xl font-bold gradient-text mb-4">🚀 Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Edit3 className="text-gold mx-auto mb-2" size={32} />
              <h3 className="text-white font-semibold mb-1">Voice-to-Code Editor</h3>
              <p className="text-gray-400 text-sm">AI-powered site editing via voice commands</p>
            </div>
            <div className="text-center p-4">
              <Activity className="text-sapphire mx-auto mb-2" size={32} />
              <h3 className="text-white font-semibold mb-1">Real-time Analytics</h3>
              <p className="text-gray-400 text-sm">Live visitor tracking and heatmaps</p>
            </div>
            <div className="text-center p-4">
              <Package className="text-platinum mx-auto mb-2" size={32} />
              <h3 className="text-white font-semibold mb-1">AI Product Generator</h3>
              <p className="text-gray-400 text-sm">Auto-generate and import products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

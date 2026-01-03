'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '../../ui/Card';

export default function AdminDashboard() {
  const [status, setStatus] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Security Check
    const auth = sessionStorage.getItem('admin-auth');
    if (auth !== 'true') {
      router.push('/admin');
      return;
    }
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error('Failed to fetch status:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-red-400"
        >
          Command Center
        </motion.h1>
        <div className="w-32 h-32 relative">
          {/* Small personal avatar preview */}
          {/* We can't put full 3D here easily without clear layout, sticking to stats first */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Status - REAL DATA */}
        <Card className="bg-red-950/30 border-red-500/20">
          <h3 className="text-xl font-bold text-red-300 mb-4">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Server</span>
              <span className={status ? 'text-green-400' : 'text-yellow-400'}>
                {status ? '● Online' : '● Connecting...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Environment</span>
              <span className="text-white font-mono text-sm">
                {status?.environment.nodeEnv || 'Loading...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Version</span>
              <span className="text-white font-mono text-sm">{status?.version || '...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Commit</span>
              <span className="text-white font-mono text-sm">{status?.git?.commit || '...'}</span>
            </div>
          </div>
        </Card>

        {/* Avatar Card - NEW */}
        <Card className="bg-red-950/30 border-red-500/20 row-span-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            {/* Dynamically import to avoid SSR issues if any */}
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center min-h-[300px]">
            <PersonalAvatarWrapper />
          </div>
        </Card>

        {/* Revenue Overview */}
        <Card className="bg-red-950/30 border-red-500/20">
          <h3 className="text-xl font-bold text-red-300 mb-4">Revenue</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-yellow-400">
              {status?.environment.hasStripe ? '$0.00 (Ready)' : '$0.00 (Config Required)'}
            </div>
            <div className="text-sm text-gray-400">This Month</div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-red-950/30 border-red-500/20 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-bold text-red-300 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
              New Project
            </button>
            <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded transition-colors">
              Publish Content
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
              View Analytics
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
              Connect Live Stream
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PersonalAvatarWrapper() {
  const PersonalAvatar = dynamic(() => import('@/components/avatar/PersonalAvatar'), {
    ssr: false,
    loading: () => <div className="text-red-500 animate-pulse">Initializing Interface...</div>,
  });
  return <PersonalAvatar />;
}

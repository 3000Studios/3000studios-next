'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  pageViews: number;
  activeSessions: number;
  liveStatus: 'online' | 'offline';
  deploymentStatus: 'deployed' | 'deploying' | 'failed';
  errorCount: number;
  commandCenterActivity: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    pageViews: 0,
    activeSessions: 0,
    liveStatus: 'offline',
    deploymentStatus: 'deployed',
    errorCount: 0,
    commandCenterActivity: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  useEffect(() => {
    // Real-time stats polling (placeholder - connect to actual analytics)
    const interval = setInterval(() => {
      setStats({
        pageViews: Math.floor(Math.random() * 10000),
        activeSessions: Math.floor(Math.random() * 100),
        liveStatus: 'offline',
        deploymentStatus: 'deployed',
        errorCount: 0,
        commandCenterActivity: 0,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
            3000 Studios Dashboard
          </h1>
          <div className="text-slate-400">Logged in as: {session.user?.email}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Page Views"
            value={stats.pageViews.toLocaleString()}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Active Sessions"
            value={stats.activeSessions.toLocaleString()}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Live Stream"
            value={stats.liveStatus.toUpperCase()}
            color={
              stats.liveStatus === 'online'
                ? 'from-green-500 to-emerald-500'
                : 'from-slate-500 to-slate-600'
            }
          />
          <StatCard
            title="Deployment"
            value={stats.deploymentStatus.toUpperCase()}
            color={
              stats.deploymentStatus === 'deployed'
                ? 'from-green-500 to-emerald-500'
                : 'from-amber-500 to-orange-500'
            }
          />
          <StatCard
            title="Errors"
            value={stats.errorCount.toLocaleString()}
            color="from-red-500 to-rose-500"
          />
          <StatCard
            title="Command Activity"
            value={stats.commandCenterActivity.toLocaleString()}
            color="from-amber-500 to-yellow-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            title="Command Center"
            description="Voice and text control with 3D avatar"
            href="/admin/command-center"
            icon="🎙️"
          />
          <ActionCard
            title="Live Stream Control"
            description="Start/stop stream and manage settings"
            href="/admin/live"
            icon="📹"
          />
          <ActionCard
            title="Store Manager"
            description="Manage Shopify store settings"
            href="/admin/store-manager"
            icon="🛍️"
          />
          <ActionCard
            title="Analytics"
            description="Detailed traffic and behavior analytics"
            href="/admin/analytics"
            icon="📊"
          />
          <ActionCard
            title="Error Logs"
            description="View and diagnose system errors"
            href="/admin/logs"
            icon="🐛"
          />
          <ActionCard
            title="Deployments"
            description="View deployment history and status"
            href="/admin/deployments"
            icon="🚀"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20">
      <div className="text-slate-400 text-sm mb-2">{title}</div>
      <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
        {value}
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 rounded-xl border-2 border-amber-400/20 hover:border-amber-400/40 transition-all duration-200 group"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </Link>
  );
}

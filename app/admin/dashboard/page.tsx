'use client';

import { motion } from 'framer-motion';
import { Activity, DollarSign, Globe, TrendingUp, Users, Zap } from 'lucide-react';
import Card from '../../ui/Card';

const STATS = [
  { label: 'Total Reach', value: '128,471', change: '+24%', icon: Globe, color: 'text-blue-400' },
  {
    label: 'Network Points',
    value: '5,293',
    change: '+18%',
    icon: Activity,
    color: 'text-green-400',
  },
  {
    label: 'Vault Balance',
    value: '$42,820',
    change: '+32%',
    icon: DollarSign,
    color: 'text-yellow-400',
  },
  { label: 'Active Sessions', value: '943', change: '+12%', icon: Users, color: 'text-purple-400' },
];

export default function DashboardPage() {
  return (
    <div className="container-standard py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#D4AF37] tracking-tighter uppercase mb-2">
            Operational Analytics
          </h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
            Real-time system throughput & intelligence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className="bg-white/5 border-white/10 hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${stat.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {stat.label}
                  </span>
                  <span className="text-3xl font-black text-white tabular-nums">{stat.value}</span>
                  <span className="text-green-400 text-[10px] font-bold mt-2 flex items-center gap-1">
                    <TrendingUp size={12} /> {stat.change}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-white/5 border-white/10 p-8 h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center mb-4 animate-pulse">
                <Zap className="text-[#D4AF37]" size={32} />
              </div>
              <h3 className="text-white font-black uppercase tracking-widest mb-2">
                Live Throughput Graph
              </h3>
              <p className="text-white/30 text-xs font-medium">
                Visualization module initializing...
              </p>
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 p-8 flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin mb-6" />
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-2">
              Neural Link
            </h3>
            <p className="text-center text-white/40 text-[10px] font-bold leading-tight uppercase tracking-wider">
              Syncing with global edge nodes for decentralized processing...
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  Code2,
  DollarSign,
  FileText,
  Gauge,
  Mic,
  Plus,
  Radio,
  Settings,
  ShoppingBag,
  Tv,
  Upload,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Admin sections organized by category
const ADMIN_SECTIONS = {
  main: [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: Gauge,
      desc: 'Strategy & Intelligence',
      color: 'bg-blue-600',
    },
    {
      label: 'Command Center',
      href: '/admin/command-center',
      icon: Building2,
      desc: 'Primary Operations Hub',
      color: 'bg-purple-600',
    },
    {
      label: 'Revenue',
      href: '/admin/revenue',
      icon: DollarSign,
      desc: 'Wealth & Monetization',
      color: 'bg-green-600',
    },
  ],
  content: [
    {
      label: 'Upload Asset',
      href: '/admin/content',
      icon: Upload,
      desc: 'Media & Resource Ingestion',
      color: 'bg-orange-600',
    },
    {
      label: 'Site Editor',
      href: '/admin/editor',
      icon: FileText,
      desc: 'Real-time Content Shaping',
      color: 'bg-pink-600',
    },
    {
      label: 'Page Builder',
      href: '/admin/builder',
      icon: Code2,
      desc: 'Modular Architecture Control',
      color: 'bg-indigo-600',
    },
  ],
  media: [
    {
      label: 'Live Control',
      href: '/admin/stream',
      icon: Tv,
      desc: 'Transmission & Broadcasting',
      color: 'bg-red-600',
    },
    {
      label: 'Inventory',
      href: '/admin/stats',
      icon: ShoppingBag,
      desc: 'Master Product Registry',
      color: 'bg-amber-600',
    },
  ],
  ai: [
    {
      label: 'Voice Gateway',
      href: '/admin/voice-remote',
      icon: Radio,
      desc: 'Neural Language Interface',
      color: 'bg-cyan-600',
    },
    {
      label: 'Voice Archive',
      href: '/admin/voice-logs',
      icon: Mic,
      desc: 'Command History & Audits',
      color: 'bg-teal-600',
    },
  ],
  core: [
    {
      label: 'System Control',
      href: '/admin/control',
      icon: Settings,
      desc: 'Base Layer Configurations',
      color: 'bg-gray-600',
    },
    {
      label: 'Global Setup',
      href: '/admin/settings',
      icon: Settings,
      desc: 'Variable & Script Tweak',
      color: 'bg-slate-600',
    },
  ],
};

export default function AdminDashboard() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const inv = setInterval(update, 1000);
    return () => clearInterval(inv);
  }, []);

  return (
    <div className="container-standard py-12">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
      >
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">
            NEXUS CONTROL
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 text-[#D4AF37] font-bold uppercase tracking-widest text-xs">
            <span className="flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
              <Zap size={14} /> LIVE SYSTEM: ONLINE
            </span>
            <span className="text-white/40 opacity-50">|</span>
            <span>{time}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              sessionStorage.removeItem('admin-auth');
              window.location.reload();
            }}
            className="px-6 py-3 bg-red-600/20 border border-red-600/50 text-red-500 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all"
          >
            Terminal Lock
          </button>
        </div>
      </motion.div>

      {/* Primary Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Intelligence & Strategy */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Controls Section */}
          <section>
            <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" /> MISSION CRITICAL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ADMIN_SECTIONS.main.map((s, idx) => (
                <MenuCard key={idx} section={s} featured />
              ))}
            </div>
          </section>

          {/* Secondary Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-orange-500" /> PRODUCTION
              </h2>
              <div className="space-y-3">
                {ADMIN_SECTIONS.content.map((s, idx) => (
                  <MenuRow key={idx} section={s} />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-red-500" /> BROADCASTING
              </h2>
              <div className="space-y-3">
                {ADMIN_SECTIONS.media.map((s, idx) => (
                  <MenuRow key={idx} section={s} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: AI & Core Infrastructure */}
        <div className="space-y-8">
          <section>
            <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-500" /> INTELLIGENCE
            </h2>
            <div className="space-y-3">
              {ADMIN_SECTIONS.ai.map((s, idx) => (
                <MenuRow key={idx} section={s} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gray-500" /> SYSTEM BASE
            </h2>
            <div className="space-y-3">
              {ADMIN_SECTIONS.core.map((s, idx) => (
                <MenuRow key={idx} section={s} />
              ))}
            </div>
          </section>

          {/* Activity Mini-Report */}
          <div className="p-6 bg-[#D4AF37] rounded-3xl text-black">
            <h3 className="font-black uppercase tracking-widest text-xs mb-4">
              Nexus Status Report
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-black/10 pb-2">
                <span className="text-[10px] font-bold uppercase opacity-60">Global Reach</span>
                <span className="text-2xl font-black tabular-nums">12.8k</span>
              </div>
              <div className="flex justify-between items-end border-b border-black/10 pb-2">
                <span className="text-[10px] font-bold uppercase opacity-60">Revenue Flow</span>
                <span className="text-2xl font-black tabular-nums">$4.2k</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold uppercase opacity-60">Active Nodes</span>
                <span className="text-2xl font-black tabular-nums transition-all animate-pulse">
                  843
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ section, featured = false }: { section: any; featured?: boolean }) {
  const Icon = section.icon;
  return (
    <Link href={section.href} className="group">
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`h-full p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md transition-all group-hover:bg-white/10 group-hover:border-[#D4AF37]/50 ${featured ? 'ring-1 ring-white/10' : ''}`}
      >
        <div
          className={`w-14 h-14 ${section.color} rounded-2xl flex items-center justify-center mb-4 shadow-xl group-hover:rotate-12 transition-transform`}
        >
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
          {section.label}
        </h3>
        <p className="text-white/40 text-xs font-medium uppercase tracking-wider mt-1">
          {section.desc}
        </p>
      </motion.div>
    </Link>
  );
}

function MenuRow({ section }: { section: any }) {
  const Icon = section.icon;
  return (
    <Link
      href={section.href}
      className="group flex items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
    >
      <div
        className={`w-10 h-10 ${section.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="text-white" size={18} />
      </div>
      <div className="flex-1 text-left">
        <h4 className="text-white font-bold group-hover:text-[#D4AF37] transition-colors leading-tight">
          {section.label}
        </h4>
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
          {section.desc}
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
        <Plus size={16} className="text-[#D4AF37]" />
      </div>
    </Link>
  );
}

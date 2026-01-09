'use client';

import { motion } from 'framer-motion';
import { Edit3, FileText, Image as ImageIcon, Plus, Trash2, Upload, Video } from 'lucide-react';
import Card from '../../ui/Card';

const CONTENT_STATS = [
  { label: 'Total Pages', value: '18', icon: FileText },
  { label: 'Media Assets', value: '142', icon: ImageIcon },
  { label: 'Vault Video', value: '42', icon: Video },
];

export default function ContentAdmin() {
  return (
    <div className="container-standard py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2 italic">
            Neural Assets
          </h1>
          <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">
            Content Orchestration & Media Vault
          </p>
        </div>

        {/* Action Header */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <div className="flex gap-8">
            {CONTENT_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon size={12} className="text-[#D4AF37]" />
                  <span className="text-white/30 text-[8px] font-black uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
                <span className="text-2xl font-black text-white italic">{stat.value}</span>
              </div>
            ))}
          </div>
          <button className="px-8 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center gap-3">
            <Plus size={16} /> Inject New Instance
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Assets List */}
          <Card className="lg:col-span-2 bg-white/5 border-white/10 p-8">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-3 italic">
              <Upload size={14} className="text-[#D4AF37]" /> Recent Stream Injections
            </h3>
            <div className="space-y-4">
              <AssetRow name="hero_nexus_cinematic.mp4" type="VIDEO" size="42.5MB" />
              <AssetRow name="platinum_surface_ref.jpg" type="IMAGE" size="2.1MB" />
              <AssetRow name="neural_core_index.json" type="DATA" size="14KB" />
              <AssetRow name="brand_identity_nexus.pdf" type="DOC" size="8.4MB" />
            </div>
          </Card>

          {/* Quick Controls */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-6">
                <Upload className="text-[#D4AF37]" size={32} />
              </div>
              <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">
                Drop-Zone Alpha
              </h3>
              <p className="text-white/30 text-[8px] font-black uppercase tracking-widest mb-6">
                Autonomous parser will sort and tag assets
              </p>
              <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center hover:border-[#D4AF37]/50 transition-colors cursor-pointer group">
                <span className="text-white/10 group-hover:text-[#D4AF37] transition-colors text-[10px] font-black uppercase tracking-widest">
                  Awaiting Payloads
                </span>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AssetRow({ name, type, size }: { name: string; type: string; size: string }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all group">
      <div className="flex items-center gap-4">
        <div
          className={`text-[8px] font-black px-2 py-0.5 rounded-sm ${type === 'VIDEO' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'}`}
        >
          {type}
        </div>
        <span className="text-xs font-bold text-white/70 group-hover:text-white transition-colors">
          {name}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-[10px] font-mono text-white/20">{size}</span>
        <div className="flex gap-2">
          <button className="p-2 text-white/30 hover:text-[#D4AF37] transition-colors">
            <Edit3 size={14} />
          </button>
          <button className="p-2 text-white/30 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

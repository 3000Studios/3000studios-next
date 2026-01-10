'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CreditCard, Shield, TrendingUp } from 'lucide-react';
import Card from '../../ui/Card';

const GATEWAYS = [
  { name: 'Stripe', status: 'ACTIVE', color: 'text-blue-400', border: 'border-blue-500/30' },
  { name: 'PayPal', status: 'ACTIVE', color: 'text-indigo-400', border: 'border-indigo-500/30' },
  { name: 'AdSense', status: 'PENDING', color: 'text-orange-400', border: 'border-orange-500/30' },
];

export default function RevenuePage() {
  return (
    <div className="container-standard py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h1 className="text-5xl font-black text-[#D4AF37] tracking-tighter uppercase mb-2 italic">
            Revenue Engine
          </h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
            Wealth Orchestration & Monetization Flow
          </p>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GATEWAYS.map((gate, idx) => (
            <Card key={idx} className={`bg-white/5 ${gate.border} p-8`}>
              <div className="flex flex-col items-center">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest mb-1 ${gate.color}`}
                >
                  {gate.name}
                </span>
                <span className="text-2xl font-black text-white italic tracking-tighter">
                  {gate.status}
                </span>
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${gate.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}
                  />
                  <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest">
                    System Readiness Check Passed
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Statement */}
          <Card className="bg-white/5 border-white/10 p-12 lg:h-full flex flex-col items-center justify-center">
            <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-8 italic">
              Master Ledger Summary
            </h2>
            <div className="space-y-8 w-full">
              <LedgerRow label="Digital Marketplace Sales" value="$0.00" />
              <LedgerRow label="Service Retainer Flow" value="$0.00" />
              <LedgerRow label="Advertising Yield" value="$0.00" />
              <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                <span className="text-[#D4AF37] font-black uppercase tracking-widest text-[10px]">
                  Net Projected Yield
                </span>
                <span className="text-5xl font-black text-white tracking-tighter tabular-nums italic">
                  $0.00
                </span>
              </div>
            </div>
          </Card>

          {/* Controls & Metrics */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-[#D4AF37]/20 p-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="text-green-500" size={24} />
                </div>
                <h3 className="text-white font-black uppercase tracking-widest text-xs mb-2">
                  Profit Optimization
                </h3>
                <p className="text-white/30 text-[9px] font-bold uppercase tracking-wider mb-6 text-center">
                  3KAI is currently analyzing conversion leaks in the storefront section.
                </p>
                <button className="w-full py-3 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] transition-all">
                  Run Liquidity Audit
                </button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <MiniStat icon={Shield} label="Security" value="MIL-GRADE" />
              <MiniStat icon={CreditCard} label="Processor" value="DIVERSIFIED" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LedgerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-white/60 font-medium text-sm group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <span className="text-white font-black tabular-nums transition-all group-hover:scale-110 tracking-tight">
          {value}
        </span>
        <ArrowUpRight size={14} className="text-white/20 group-hover:text-green-500" />
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <Card className="bg-white/5 border-white/5 p-6 flex flex-col items-center">
      <Icon className="text-white/20 mb-3" size={20} />
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">
        {label}
      </span>
      <span className="text-white font-black text-xs uppercase tracking-widest">{value}</span>
    </Card>
  );
}



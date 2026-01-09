'use client';

import { Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Command Center', href: '/admin/command-center' },
  { label: 'Revenue', href: '/admin/revenue' },
  { label: 'Builder', href: '/admin/builder' },
  { label: 'Editor', href: '/admin/editor' },
  { label: 'Content', href: '/admin/content' },
  { label: 'Stats', href: '/admin/stats' },
  { label: 'Stream', href: '/admin/stream' },
  { label: 'Voice Logs', href: '/admin/voice-logs' },
  { label: 'Voice Remote', href: '/admin/voice-remote' },
  { label: 'Control', href: '/admin/control' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-2xl border-b border-[#D4AF37]/20">
      <div className="container-standard flex items-center justify-between h-20">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Lock className="text-black" size={16} />
            </div>
            <span className="text-white font-black tracking-tighter text-lg italic">NEXUS</span>
          </Link>

          <div className="hidden xl:flex items-center gap-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          href="/"
          className="px-6 py-2 rounded-xl border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all active:scale-95"
        >
          Close Terminal
        </Link>
      </div>
    </nav>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import AdminNav from '../ui/AdminNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auto‑authenticate on first render (no password required)
  useEffect(() => {
    // If a previous session exists, keep it; otherwise create one
    sessionStorage.setItem('admin-auth', 'true');
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If for any reason not authenticated, show a minimal unlock screen that simply redirects
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
            {/* <Lock className="text-[#D4AF37]" size={32} /> */}
          </div>
          <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
            Terminal Locked
          </h2>
          <Link
            href="/login"
            className="px-8 py-3 bg-[#D4AF37] text-black font-black rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all uppercase tracking-widest inline-block"
          >
            Authenticate
          </Link>
        </motion.div>
      </div>
    );
  }

  const isAdminRoot = pathname === '/admin';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30">
      {!isAdminRoot && <AdminNav />}
      <main className={`w-full ${!isAdminRoot ? 'pt-20' : ''}`}>{children}</main>
    </div>
  );
}

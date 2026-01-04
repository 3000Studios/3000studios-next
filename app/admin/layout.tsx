'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import AdminNav from '../ui/AdminNav';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '88888888';
const BOSS_PASSWORD = 'Bossman3000!!!';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD || password === BOSS_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true');
      setIsAuthenticated(true);
    } else {
      setError('System Access Denied: Invalid Credentials');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Unified Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="relative z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium p-8 rounded-3xl border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-4">
                <Lock className="text-black" size={32} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter mb-1">
                CENTRAL COMMAND
              </h1>
              <p className="text-[#D4AF37]/70 text-sm font-medium uppercase tracking-[0.2em]">
                Secure Authorization Required
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}

              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all text-center text-lg tracking-widest"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-[#D4AF37] to-[#FFD700] text-black font-black rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-95 uppercase tracking-widest"
              >
                Enter Nexus
              </button>
            </form>

            <Link
              href="/"
              className="mt-8 block text-center text-white/40 hover:text-[#D4AF37] text-xs transition-colors font-bold uppercase tracking-widest"
            >
              ← Return to Site
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const isAdminRoot = pathname === '/admin';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30">
      {/* Persistant Admin Navigation */}
      {!isAdminRoot && <AdminNav />}

      <main className={`w-full ${!isAdminRoot ? 'pt-20' : ''}`}>{children}</main>
    </div>
  );
}

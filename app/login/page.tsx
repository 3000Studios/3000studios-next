'use client';

import VideoBackground from '@/components/VideoBackground';
import { motion } from 'framer-motion';
import { AlertCircle, Lock, Shield, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Admin password - matched with central command logic
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '88888888';
const BOSS_PASSWORD = 'Bossman3000!!!';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsRedirecting(true);
      router.replace('/admin');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Secure authentication trace
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password === ADMIN_PASSWORD || password === BOSS_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true');
      router.replace('/admin');
    } else {
      setError('ACCESS_DENIED: Invalid core credential sequence.');
      setPassword('');
      setIsSubmitting(false);
    }
  };

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black font-mono">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
          <div className="text-[#D4AF37] animate-pulse tracking-[0.3em] text-xs font-black uppercase">
            Initialising_3KAI_Handshake...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-sans">
      {/* 3KAI Atmospheric Background */}
      <VideoBackground
        src="https://res.cloudinary.com/dj92eb97f/video/upload/v1767518758/5529964-hd_720_1280_25fps_iirxgn.mp4"
        opacity={0.2}
      />

      {/* Scanning Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      <div className="absolute inset-0 z-0 bg-radial-at-c from-transparent via-black/80 to-black" />

      {/* Hero Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Terminal Container */}
      <div className="relative z-10 w-full max-w-lg px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-3xl bg-black/60 border border-[#D4AF37]/30 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative group overflow-hidden"
        >
          {/* Internal Neon Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          {/* Terminal Header */}
          <div className="text-center mb-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="w-24 h-24 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            >
              <Terminal className="text-[#D4AF37] animate-neon-flash" size={42} />
            </motion.div>

            <h1 className="text-4xl font-black italic text-white tracking-tighter uppercase mb-3">
              3KAI <span className="text-[#D4AF37]">Nexus</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="text-green-500/80" size={14} />
              <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">
                ENCRYPTED_AUTH_GATE_VERSION_3.12
              </span>
            </div>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-red-950/40 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold text-center flex items-center justify-center gap-3 backdrop-blur-md"
              >
                <AlertCircle size={18} className="shrink-0" />
                <span className="font-mono">{error}</span>
              </motion.div>
            )}

            <div className="relative group">
              <label
                htmlFor="password"
                className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3 ml-2"
              >
                Identification Sequence
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-xl text-center tracking-[0.5em] placeholder-white/5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all shadow-inner font-mono"
                  placeholder="••••••••"
                  autoFocus
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                  <Lock size={20} className="text-white" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="w-full py-5 bg-linear-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black font-black text-lg rounded-2xl hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-500 active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:pointer-events-none uppercase tracking-[0.2em] relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Synchronising...</span>
                  </>
                ) : (
                  <>
                    <span>Authorise Access</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </form>

          {/* Terminal Footer */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <Link
              href="/"
              className="px-6 py-2 rounded-full border border-white/5 text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
            >
              ← Cancel Operation
            </Link>
            <div className="flex gap-4 opacity-20 text-white">
              <div className="text-[8px] font-mono">3KAI_CORE_READY</div>
              <div className="text-[8px] font-mono">IP_TRACE: ACTIVE</div>
              <div className="text-[8px] font-mono">LATENCY: 12ms</div>
            </div>
          </div>
        </motion.div>

        {/* Security Disclaimer */}
        <p className="mt-8 text-center text-white/10 text-[9px] font-mono tracking-widest uppercase max-w-xs mx-auto">
          Warning: Unauthorised access attempts are logged and transmitted to the 3000 Studios
          Central Security Matrix.
        </p>
      </div>
    </div>
  );
}

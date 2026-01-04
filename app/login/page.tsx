'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();

  // Auto‑authenticate on first render and redirect to admin dashboard
  useEffect(() => {
    // Set a flag so other parts of the app recognise the admin session
    sessionStorage.setItem('admin-auth', 'true');
    router.replace('/admin');
  }, [router]);

  // Minimal loading UI while the redirect occurs
  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-mono">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
        <div className="text-[#D4AF37] animate-pulse tracking-[0.3em] text-xs font-black uppercase">
          Initialising_3KAI_Handshake...
        </div>
        <Link
          href="/"
          className="px-6 py-2 rounded-full border border-white/5 text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
        >
          ← Cancel Operation
        </Link>
      </div>
    </div>
  );
}

'use client';

import VideoBackground from '@/components/VideoBackground';
import { AlertCircle, Lock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Admin password - in production this should be environment variable
const ADMIN_PASSWORD = '88888888';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      router.replace('/admin');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate slight delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true');
      router.replace('/admin');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Effects */}
      <VideoBackground opacity={0.15} />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur-3xl opacity-10 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] rounded-full blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-500/5 to-transparent rounded-full" />

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="backdrop-blur-xl bg-white/5 border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-black/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
              <Lock className="text-black" size={36} />
            </div>
            <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm">
              Enter your credentials to access the control panel
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 rounded-full bg-green-900/20 border border-green-500/30 mx-auto w-fit">
            <Shield className="text-green-400" size={14} />
            <span className="text-green-400 text-xs font-medium">Secure Connection</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-3 animate-shake">
                <AlertCircle size={20} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all disabled:opacity-50"
                placeholder="••••••••"
                autoFocus
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold text-lg rounded-xl hover:from-[#FFD700] hover:to-[#FFC700] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access Admin Panel</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors inline-flex items-center gap-1"
            >
              ← Back to Home
            </Link>
            <p className="text-gray-600 text-xs">Protected by 3000 Studios Security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

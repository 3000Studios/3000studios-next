'use client';

import EditorMain from '@/components/webeditor/EditorMain';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function VIPPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user was already authenticated in this session
    const auth = sessionStorage.getItem('vip_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '5555') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vip_auth', 'true');
      setError('');
    } else {
      setError('ACCESS DENIED: INVALID QUANTUM KEY');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-4"
                >
                  <div className="w-16 h-16 border-2 border-yellow-500/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-yellow-500 rounded-full" />
                  </div>
                </motion.div>
                <h1 className="text-3xl font-black tracking-tighter italic uppercase text-yellow-500">
                  VIP ACCESS
                </h1>
                <p className="text-sm text-gray-500 font-mono tracking-widest mt-2 uppercase">
                  Authorization Required
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ENTER QUANTUM KEY"
                    className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 transition-all font-mono text-center tracking-[1em]"
                    autoFocus
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-mono text-center"
                  >
                    {error}
                  </motion.p>
                )}
                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 active:scale-[0.98] transition-all"
                >
                  INITIALIZE SESSION
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-20 lg:p-4"
          >
            <div className="max-w-[1920px] mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black italic text-yellow-500 uppercase">
                    3000 Web Editor
                  </h1>
                  <p className="text-xs text-gray-500 font-mono">SECURE VIP CHANNEL ESTABLISHED</p>
                </div>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    sessionStorage.removeItem('vip_auth');
                  }}
                  className="px-4 py-2 text-xs font-mono border border-white/10 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  TERMINATE SESSION
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-black shadow-2xl">
                <EditorMain />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

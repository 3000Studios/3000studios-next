'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-widest text-[#D4AF37]">ADMIN DASHBOARD</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded uppercase text-xs tracking-widest transition-colors"
        >
          Disconnect
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-white/10 rounded-xl bg-white/5">
          <h3 className="text-gray-500 text-xs tracking-widest mb-4">SYSTEM STATUS</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Site status: ONLINE
            </li>
            <li className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Deploy pipeline: CONNECTED
            </li>
            <li className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Voice API: READY
            </li>
            <li className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              VIP UI: ENABLED
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

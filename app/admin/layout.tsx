'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import AdminNav from '../ui/AdminNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoot = pathname === '/admin';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30">
      {/* Persistent Admin Navigation */}
      {!isAdminRoot && <AdminNav />}
      <main className={`w-full ${!isAdminRoot ? 'pt-20' : ''}`}>{children}</main>
    </div>
  );
}

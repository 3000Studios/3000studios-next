import { ReactNode } from 'react';
import Nav from '../ui/Nav';
import AdminNav from '../ui/AdminNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37]/30">
      <Nav />
      <div className="pt-24">
        {' '}
        {/* Space for public Nav */}
        <AdminNav />
        <main className="w-full pt-20">{children}</main>
      </div>
    </div>
  );
}

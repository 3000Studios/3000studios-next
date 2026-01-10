import React, { useState } from 'react';
import Link from 'next/link';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-root min-h-screen bg-black text-white">
      <header className="admin-header p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button aria-label="menu" className="hamburger p-2" onClick={() => setOpen(!open)}>
            <span className="hamburger-line block w-6 h-[2px] bg-white"></span>
            <span className="hamburger-line block w-6 h-[2px] bg-white mt-1"></span>
            <span className="hamburger-line block w-6 h-[2px] bg-white mt-1"></span>
          </button>
          <h1 className="text-xl font-bold">ADMIN DASHBOARD</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/"><a className="text-sm text-gray-300 hover:text-white">View Site</a></Link>
        </div>
      </header>

      <div className="admin-container flex">
        <aside className={`admin-sidebar ${open ? 'open' : ''} bg-gray-900 p-4`}>
          <nav className="space-y-2">
            <Link href="/admin"><a className="block">Overview</a></Link>
            <Link href="/admin/revenue"><a className="block">Revenue</a></Link>
            <Link href="/admin/live"><a className="block">Live</a></Link>
            <Link href="/admin/store"><a className="block">Store Manager</a></Link>
            <Link href="/admin/content"><a className="block">Content Automation</a></Link>
            <Link href="/admin/voice-logs"><a className="block">Voice Logs</a></Link>
            <Link href="/admin/settings"><a className="block">Settings</a></Link>
          </nav>
        </aside>

        <main className="admin-main flex-1 p-6">
          <div className="admin-top flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400 uppercase">Welcome back</p>
              <h2 className="text-2xl font-bold">Administrator</h2>
            </div>
            <div>
              <AdminAvatar />
            </div>
          </div>

          <section className="admin-children">{children}</section>
        </main>
      </div>
    </div>
  );
}

function AdminAvatar() {
  const size = '15vw';
  return (
    <div className="admin-avatar flex items-center gap-3">
      <div className="avatar-figure rounded-full overflow-hidden" style={{ width: size, height: size }}>
        <img src="/images/admin-female-placeholder.jpg" alt="Admin avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div>
        <div className="text-sm font-bold">Admin</div>
        <div className="text-xs text-gray-400">Online</div>
      </div>
    </div>
  );
}
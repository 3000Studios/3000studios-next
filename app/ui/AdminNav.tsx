'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Revenue', href: '/admin/revenue' },
  { label: 'Content', href: '/admin/content' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-red-950/90 to-black/90 backdrop-blur-md border-b border-red-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-red-400 font-bold text-lg">ADMIN PANEL</div>
            <div className="hidden md:flex items-center space-x-2">
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : 'text-red-200 hover:text-white hover:bg-red-900/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Exit Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

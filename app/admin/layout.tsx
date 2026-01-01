'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import AdminNav from '../ui/AdminNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, [pathname]);

  // Don't show admin nav on the main /admin page (which handles its own auth)
  const isAdminRoot = pathname === '/admin';

  if (isLoading) {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  return (
    <>
      {/* Only show AdminNav if authenticated and not on root admin page */}
      {isAuthenticated && !isAdminRoot && <AdminNav />}
      <div
        className={`min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 ${isAuthenticated && !isAdminRoot ? 'pt-16' : ''}`}
      >
        {children}
      </div>
    </>
  );
}

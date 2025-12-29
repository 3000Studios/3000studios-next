'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide all global UI elements on the landing page
  if (pathname === '/') {
    return null;
  }

  return <>{children}</>;
}

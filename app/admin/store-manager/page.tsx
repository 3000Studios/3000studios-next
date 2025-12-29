'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StoreManagerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-amber-400/20 bg-slate-950/50 p-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
          Shopify Store Manager
        </h1>
      </div>

      <div className="h-[calc(100vh-5rem)]">
        <iframe
          src="https://admin.shopify.com/store/3000-studios/themes?appLoadId=9624f85b-f325-4596-926e-9c87db6a0b2f"
          className="w-full h-full border-0"
          title="Shopify Admin"
        />
      </div>
    </div>
  );
}

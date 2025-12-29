'use client';

import { useEffect } from 'react';

export default function ShopifyRedirect() {
  useEffect(() => {
    // Immediate redirect to Shopify store
    window.location.href = 'https://3000-studios.myshopify.com/';
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
        <p className="text-amber-400 text-xl font-bold">Redirecting to 3000 Studios Store...</p>
      </div>
    </div>
  );
}

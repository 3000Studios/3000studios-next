'use client'

import { useEffect } from 'react'

export default function ShopifyRedirect() {
  useEffect(() => {
    window.location.href = 'https://3000-studios.myshopify.com/'
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-amber-400">Redirecting to Shopify…</div>
    </div>
  )
}

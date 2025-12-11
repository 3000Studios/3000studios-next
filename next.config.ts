import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Real-Time Sync Configuration for Boss Man J */
  
  // Enable experimental features for faster updates
  experimental: {
    // Enable Server Actions for real-time updates
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Incremental Static Regeneration (ISR)
  // Allows pages to be updated without full rebuild
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    domains: ['3000studios.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable compression
  compress: true,

  // Production source maps for debugging (can be disabled for faster builds)
  productionBrowserSourceMaps: false,
};

export default nextConfig;

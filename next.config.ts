import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Real-Time Sync Configuration for Boss Man J */
<<<<<<< HEAD

=======
  
>>>>>>> origin/pr/50
  // Enable experimental features for faster updates
  experimental: {
    // Enable Server Actions for real-time updates
    serverActions: {
<<<<<<< HEAD
      bodySizeLimit: "2mb",
=======
      bodySizeLimit: '2mb',
>>>>>>> origin/pr/50
    },
  },

  // Incremental Static Regeneration (ISR)
  // Allows pages to be updated without full rebuild
  async headers() {
    return [
      {
<<<<<<< HEAD
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=120",
=======
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
>>>>>>> origin/pr/50
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
<<<<<<< HEAD
        protocol: "https",
        hostname: "3000studios.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    formats: ["image/avif", "image/webp"],
=======
        protocol: 'https',
        hostname: '3000studios.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
>>>>>>> origin/pr/50
  },

  // Enable compression
  compress: true,

  // Production source maps for debugging (can be disabled for faster builds)
  productionBrowserSourceMaps: false,
};

export default nextConfig;

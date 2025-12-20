import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
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
=======
  /* Production Optimizations */
  reactStrictMode: true,
  
  /* Performance Optimizations */
  compress: true,
  poweredByHeader: false,
  
  /* Turbopack Configuration */
  turbopack: {},
  
  /* Image Optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  /* Security Headers */
>>>>>>> origin/copilot/update-best-options
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
<<<<<<< HEAD
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3000studios.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable compression
  compress: true,

  // Production source maps for debugging (can be disabled for faster builds)
  productionBrowserSourceMaps: false,
=======
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
>>>>>>> origin/copilot/update-best-options
};

export default nextConfig;

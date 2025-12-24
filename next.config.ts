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

<<<<<<< HEAD
  // Security and Performance Headers
=======
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
>>>>>>> origin/copilot/update-main-with-all-branches
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
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
=======
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          // HTTPS enforcement
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      // CSP header for enhanced security
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://js.stripe.com https://m.stripe.network https://www.paypal.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://js.stripe.com https://www.paypal.com;",
>>>>>>> origin/copilot/resolve-git-conflicts
          },
        ],
      },
    ];
  },

<<<<<<< HEAD
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
<<<<<<< HEAD
  // Redirects removed to prevent local SSL loops; Vercel handles this automatically
>>>>>>> origin/copilot/resolve-git-conflicts
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
>>>>>>> origin/copilot/update-main-with-all-branches
};

export default nextConfig;

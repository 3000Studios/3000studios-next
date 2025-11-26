// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

// © 2025 3000 Studios / ShadowOS
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "3000studios.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" }
    ]
  },

  typescript: {
    ignoreBuildErrors: false
  },

  // Next.js 15 compatible
  experimental: {
    optimizeCss: true
  },

  // This is the new location Next.js demands
  serverExternalPackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei"
  ]
};

module.exports = nextConfig;

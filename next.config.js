// © 2025 3000 Studios / ShadowOS
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

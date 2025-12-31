/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disabling turbo momentarily to force cleaner HMR behavior per user instruction
    turbo: undefined 
  },
  // Ensure we are using standalone output for Vercel efficiency
  output: "standalone",
  // React strict mode for robust dev
  reactStrictMode: true,
  // Force headers to kill stale cache
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Cache-Control", value: "no-store, must-revalidate" }
      ]
    }
  ],
  // Image domains for remote assets
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "models.readyplayer.me" },
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  }
};

export default nextConfig;

import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Explicit Turbopack declaration (required for Next.js 16+)
  turbopack: {},

  // Webpack compatibility layer (non-invasive)
  webpack: (config) => {
    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

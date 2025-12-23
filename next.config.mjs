/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}
  },
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;

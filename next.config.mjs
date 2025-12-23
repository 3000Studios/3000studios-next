/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

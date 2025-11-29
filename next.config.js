/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}
<<<<<<< HEAD
=======
  },
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
>>>>>>> copilot/fix-workflows-and-actions
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

<<<<<<< HEAD
export default nextConfig;
=======
module.exports = nextConfig;
>>>>>>> copilot/fix-workflows-and-actions

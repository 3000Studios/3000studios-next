/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
<<<<<<< HEAD
    serverActions: {},
  },

  typescript: {
    ignoreBuildErrors: true,
  },
=======
    serverActions: {}
  },
  turbopack: {},
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
>>>>>>> origin/copilot/update-main-with-all-branches
};

export default nextConfig;

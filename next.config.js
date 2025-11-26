// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "3000studios.com"
            },
            {
                protocol: "https",
                hostname: "github.com"
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: false
    },
    reactStrictMode: true
};

module.exports = nextConfig;

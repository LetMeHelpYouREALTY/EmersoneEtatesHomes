
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'types']
  },
  
  // Fix cross-origin warnings for Replit
  experimental: {
    allowedRevalidateHeaderKeys: ['content-type'],
    scrollRestoration: true
  },
  
  // Development configuration
  async rewrites() {
    return []
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  
  // Configure image optimization
  images: {
    unoptimized: true,
    domains: ['em.realscout.com']
  },
  
  // Webpack configuration for development stability
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;

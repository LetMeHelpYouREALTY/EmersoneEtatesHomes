import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'types']
  },

  // Security and CORS headers
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
            value: 'SAMEORIGIN',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },

  // Image optimization
  images: {
    unoptimized: true,
    domains: ['em.realscout.com']
  },

  outputFileTracingRoot: process.cwd(),
  experimental: {
    allowedRevalidateHeaderKeys: ['content-type'],
    scrollRestoration: true
  },

  // Development origins configuration
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      allowedRevalidateHeaderKeys: ['content-type'],
      scrollRestoration: true,
    }
  }),

  async rewrites() {
    return []
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
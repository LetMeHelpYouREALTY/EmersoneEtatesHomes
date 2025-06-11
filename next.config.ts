import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Fix cross-origin issues in development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  
  // Configure image optimization for production
  images: {
    unoptimized: true,
    domains: ['em.realscout.com']
  },
  
  // Experimental features - simplified for stability
  experimental: {
    scrollRestoration: true
  }
};

export default nextConfig;
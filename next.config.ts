
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drjanlasvegas.wpengine.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Headers for security and performance
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/:path*',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(ico|jpg|jpeg|png|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Experimental features
  experimental: {
    scrollRestoration: true,
    ...(process.env.NODE_ENV === 'production' && {
      optimizeCss: true,
    }),
  },

  // Development origins
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      '*.replit.dev',
      '*.repl.it',
      'localhost:5000',
      '0.0.0.0:5000'
    ],
  }),

  // Dev configuration
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
    webpack: (config: any, { dev, isServer }: any) => {
      if (dev && !isServer) {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        };
      }
      return config;
    },
  }),
  
  // Bundle analyzer for production builds
  ...(process.env.ANALYZE === 'true' && {
    env: {
      ANALYZE: 'true'
    }
  })
}

export default nextConfig

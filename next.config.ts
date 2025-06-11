
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
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // Experimental features
  ...(process.env.NODE_ENV === 'development' ? {
    experimental: {
      scrollRestoration: true,
    },
    allowedDevOrigins: [
      '*.replit.dev',
      '*.repl.it',
      'localhost:5000',
      '0.0.0.0:5000'
    ],
  } : {
    experimental: {
      scrollRestoration: true,
      optimizeCss: true,
    },
  }),

  // Dev configuration
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
    swcMinify: false,
    fastRefresh: true,
  }),
  
  // Bundle analyzer for production builds
  ...(process.env.ANALYZE === 'true' && {
    env: {
      ANALYZE: 'true'
    }
  })
}

export default nextConfig

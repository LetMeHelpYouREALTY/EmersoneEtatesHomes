
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow cross-origin requests for Replit development environment
  allowedDevOrigins: [
    '*.riker.replit.dev',
    '*.replit.dev',
    '*.repl.co',
    'localhost:*',
    '127.0.0.1:*',
    '0.0.0.0:*'
  ],
  
  // Your existing experimental config
  experimental: {
    scrollRestoration: true
  }
}

export default nextConfig

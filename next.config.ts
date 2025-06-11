
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove REPLIT_DOMAINS check as it may not be available during build
  // Configure for production deployment
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // Ensure proper static optimization
  trailingSlash: false,
  // Optimize for deployment
  compress: true,
  poweredByHeader: false,
  // Configure image optimization for production
  images: {
    unoptimized: true // Required for static deployments
  }
};

export default nextConfig;

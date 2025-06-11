import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for development hot reload files and static assets
  if (process.env.NODE_ENV === 'development') {
    const pathname = request.nextUrl.pathname;
    if (pathname.includes('_next/webpack-hmr') || 
        pathname.includes('hot-update') ||
        pathname.includes('_next/static') ||
        pathname.includes('_next/image') ||
        pathname.startsWith('/_next/')) {
      return NextResponse.next()
    }
  }

  // Add security headers
  const response = NextResponse.next()

  // Security headers (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internal files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next|favicon.ico|robots.txt|sitemap|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)',
  ],
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for development hot reload files
  if (request.nextUrl.pathname.includes('_next/webpack-hmr') || 
      request.nextUrl.pathname.includes('hot-update')) {
    return NextResponse.next()
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
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - _next/webpack-hmr (development hot reload)
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico).*)',
  ],
}
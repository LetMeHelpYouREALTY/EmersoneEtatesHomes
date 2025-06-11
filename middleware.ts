
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Basic middleware - just pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}

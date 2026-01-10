import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy: Guard /matrix route
 * Redirects unauthenticated requests to /login
 * Migrated from middleware to proxy for Next.js 16+
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /matrix route
  if (pathname.startsWith('/matrix')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/matrix/:path*'],
};


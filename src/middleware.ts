import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Middleware: Guard /matrix route
 * Redirects unauthenticated requests to /login
 */
export function middleware(request: NextRequest) {
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

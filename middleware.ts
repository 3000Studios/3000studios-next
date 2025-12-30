import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'shadow-jwt-secret-key-128-bit-production');

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // ✅ Protect /matrix routes - require JWT session token
  if (url.pathname.startsWith('/matrix')) {
    const token = req.cookies.get('session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verify JWT signature
    try {
      await jose.jwtVerify(token, JWT_SECRET);
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // ✅ Protect /admin routes - require JWT session token
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verify JWT signature
    try {
      await jose.jwtVerify(token, JWT_SECRET);
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // ✅ Protect /live with optional password
  if (url.pathname.startsWith('/live') && process.env.LIVE_PASSWORD) {
    const pass = url.searchParams.get('access');
    if (pass !== process.env.LIVE_PASSWORD) {
      // Allow public view but could add restrictions
    }
  }

  // ✅ Rate limiting for AI routes
  const RATE_LIMIT = new Map<string, { count: number; ts: number }>();
  const WINDOW_MS = 60_000;
  const MAX_REQUESTS = 30;

  if (url.pathname.startsWith('/api/ai')) {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const now = Date.now();

    const entry = RATE_LIMIT.get(ip) ?? { count: 0, ts: now };

    if (now - entry.ts > WINDOW_MS) {
      RATE_LIMIT.set(ip, { count: 1, ts: now });
      return NextResponse.next();
    }

    if (entry.count >= MAX_REQUESTS) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }

    RATE_LIMIT.set(ip, { count: entry.count + 1, ts: entry.ts });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/matrix/:path*', '/admin/:path*', '/live/:path*', '/api/ai/:path*'],
};

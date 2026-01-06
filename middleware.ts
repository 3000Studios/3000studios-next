import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RATE_LIMIT = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // 1. Admin Auth Check
  if (url.pathname.startsWith('/admin')) {
    const auth = req.cookies.get('auth');
    if (!auth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // 2. /live Protection
  if (url.pathname.startsWith("/live")) {
    const livePass = process.env.LIVE_PASSWORD || '3000-LIVE';
    const pass = url.searchParams.get("access");
    if (pass !== livePass) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 3. Rate Limiting for AI routes
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
  matcher: ['/admin/:path*', '/api/ai/:path*', '/live/:path*'],
};


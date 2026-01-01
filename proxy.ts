import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

export function proxy(req: NextRequest) {
  // 1. Auth Check (formerly middleware.ts)
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const auth = req.cookies.get('auth');
    if (!auth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // 2. Rate Limiting (formerly proxy.ts)
  // Only applying rate limiting to AI routes
  if (req.nextUrl.pathname.startsWith('/api/ai')) {
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
  // Combine matchers from both files
  matcher: ['/admin/:path*', '/api/ai/:path*'],
};

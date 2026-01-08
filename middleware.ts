import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RATE_LIMIT = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // 1. Admin & VIP Auth Check
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/vip')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // Explicitly check for admin role if needed, or just presence of token
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', url.pathname);
      return NextResponse.redirect(loginUrl);
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


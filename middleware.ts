import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const RATE_LIMIT = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

export async function middleware(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const now = Date.now();
  const record = RATE_LIMIT.get(ip);

  if (!record || now - record.ts > WINDOW_MS) {
    RATE_LIMIT.set(ip, { count: 1, ts: now });
  } else {
    record.count++;
    if (record.count > MAX_REQUESTS) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  const pathname = req.nextUrl.pathname;

  // 🔐 Protect Admin + VIP
  if (pathname.startsWith('/admin') || pathname.startsWith('/vip')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/vip/:path*',
    '/api/ai/:path*',
    '/live/:path*',
  ],
};


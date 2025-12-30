import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const url = req.nextUrl;

  // Protect /live with optional password
  if (url.pathname.startsWith("/live") && process.env.LIVE_PASSWORD) {
    const pass = url.searchParams.get("access");
    if (pass !== process.env.LIVE_PASSWORD) {
      // Allow public view but could add restrictions
    }
  }

  // Rate limiting for AI routes
  if (url.pathname.startsWith("/api/ai")) {
    const RATE_LIMIT = new Map<string, { count: number; ts: number }>();
    const WINDOW_MS = 60_000;
    const MAX_REQUESTS = 30;
    
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();

    const entry = RATE_LIMIT.get(ip) ?? { count: 0, ts: now };

    if (now - entry.ts > WINDOW_MS) {
      RATE_LIMIT.set(ip, { count: 1, ts: now });
      return NextResponse.next();
    }

    if (entry.count >= MAX_REQUESTS) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    RATE_LIMIT.set(ip, { count: entry.count + 1, ts: entry.ts });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/live/:path*", "/api/ai/:path*", "/matrix/:path*"],
};

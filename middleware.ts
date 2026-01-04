import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Global Scope for caching (Edge/Serverless warm instances)
// Note: This is not shared across instances. For distributed rate limiting, use Redis.
const RATE_LIMIT = new Map<string, { count: number; ts: number }>();

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Protect /live with optional password
    // (Logic preserved from original simplified middleware)
    if (url.pathname.startsWith("/live") && process.env.LIVE_PASSWORD) {
        const pass = url.searchParams.get("access");
        if (pass !== process.env.LIVE_PASSWORD) {
            // Intentionally left open for public view by default per current logic
            // Add redirection or error here to enforce strict protection
        }
    }

    // Rate limiting for AI routes
    if (url.pathname.startsWith("/api/ai")) {
        const WINDOW_MS = 60_000;
        const MAX_REQUESTS = 30;

        // x-forwarded-for is standard for proxies/load balancers (Vercel)
        const ip = req.headers.get("x-forwarded-for") ?? "unknown";
        const now = Date.now();

        const entry = RATE_LIMIT.get(ip) ?? { count: 0, ts: now };

        if (now - entry.ts > WINDOW_MS) {
            // Reset window
            RATE_LIMIT.set(ip, { count: 1, ts: now });
        } else {
            if (entry.count >= MAX_REQUESTS) {
                return new NextResponse("Rate limit exceeded", { status: 429 });
            }
            // Increment
            RATE_LIMIT.set(ip, { count: entry.count + 1, ts: entry.ts });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/live/:path*",
        "/api/ai/:path*",
        "/admin/:path*"
    ],
};

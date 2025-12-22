import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSession } from "@/lib/matrix/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Protect /matrix routes
  if (url.pathname.startsWith("/matrix")) {
    const sessionCookie = req.cookies.get("matrix-session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const email = await validateSession(sessionCookie);

    if (!email) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /live with optional password
  if (url.pathname.startsWith("/live") && process.env.LIVE_PASSWORD) {
    const pass = url.searchParams.get("access");
    if (pass !== process.env.LIVE_PASSWORD) {
      // Allow public view but could add restrictions
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/matrix/:path*", "/live/:path*"],
};

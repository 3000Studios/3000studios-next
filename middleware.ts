import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

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
  matcher: ["/live/:path*"],
};

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

  // Protect /shadow routes
  if (url.pathname.startsWith("/shadow")) {
    const sessionCookie = req.cookies.get("shadow-session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/shadow-login", req.url));
    }

    const email = await validateShadowSession(sessionCookie);

    if (!email) {
      return NextResponse.redirect(new URL("/shadow-login", req.url));
    }
  }

  // Protect /api/shadow routes (except auth)
  if (url.pathname.startsWith("/api/shadow") && !url.pathname.startsWith("/api/shadow/auth")) {
    const sessionCookie = req.cookies.get("shadow-session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = await validateShadowSession(sessionCookie);

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  matcher: ["/matrix/:path*", "/shadow/:path*", "/api/shadow/:path*", "/live/:path*"],
};

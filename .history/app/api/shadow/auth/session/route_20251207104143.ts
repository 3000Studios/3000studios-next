import { NextRequest, NextResponse } from "next/server";
import { validateShadowSession } from "@/lib/shadow/auth";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("shadow-session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const email = await validateShadowSession(sessionCookie);

    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email });
  } catch (error) {
    console.error("Shadow session check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
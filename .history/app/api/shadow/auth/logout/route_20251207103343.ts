import { NextRequest, NextResponse } from "next/server";
import { destroyShadowSession } from "@/lib/shadow/auth";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("shadow-session")?.value;

    if (sessionCookie) {
      await destroyShadowSession(sessionCookie);
    }

    const response = NextResponse.json({ success: true });

    // Clear the cookie
    response.cookies.set("shadow-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Shadow logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
/**
 * /api/auth/login
 * Validates credentials and returns session token.
 */

import { createSessionToken, verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 1 day

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const isValid = verifyAdmin(email, password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createSessionToken(email);

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}`,
        },
      },
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

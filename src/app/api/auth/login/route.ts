/**
 * /api/auth/login
 * Validates credentials and returns session token
 */

import { createSessionToken, verifyAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 },
      );
    }

    const result = verifyAdmin(email, password);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 401 });
    }

    const token = createSessionToken(email);

    // Return token to be stored in httpOnly cookie by client
    return NextResponse.json(
      {
        success: true,
        token,
        user: result.user,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
        },
      },
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}

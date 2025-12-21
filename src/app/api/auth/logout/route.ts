/**
 * /api/auth/logout
 * Clears session token
 */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: true, message: "Logged out" },
    {
      status: 200,
      headers: {
        "Set-Cookie":
          "auth_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
      },
    },
  );
}

import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  const token = (await req.json()).token;

  if (!token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const result = verifySessionToken(token);
  return NextResponse.json({ valid: result.success, user: result.user });
}

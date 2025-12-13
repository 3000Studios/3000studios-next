import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  console.log("PAYPAL WEBHOOK:", body);
  return NextResponse.json({ ok: true });
}

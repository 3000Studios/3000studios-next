import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const event = await req.json();

  console.log("[REVENUE EVENT]", JSON.stringify(event, null, 2));

  return NextResponse.json({
    ok: true,
    received: true,
    ts: Date.now()
  });
}

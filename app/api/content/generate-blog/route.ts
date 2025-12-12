import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "ok",
    monetization: "blog-generated",
    ts: Date.now()
  });
}

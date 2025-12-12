import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "ok",
    monetization: "product-generated",
    ts: Date.now()
  });
}

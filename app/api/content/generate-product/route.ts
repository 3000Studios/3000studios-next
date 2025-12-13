import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    title: "AI Automation Toolkit",
    price: 49,
    content: "Generated product ready for sale.",
  });
}

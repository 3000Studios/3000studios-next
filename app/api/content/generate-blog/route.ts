import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    title: "How AI Automation Makes Money",
    body: "SEO blog auto-generated for traffic.",
  });
}

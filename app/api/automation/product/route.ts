import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    sku: `AUTO-${Date.now()}`,
    name: "Shadow Prime AI Automation Kit",
    price_cents: 4900,
    currency: "USD"
  });
}

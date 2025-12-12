import { NextResponse } from "next/server";

export async function POST() {
  const product = {
    name: "Automation Toolkit",
    price: 49,
    affiliate: true,
    payout: "recurring"
  };

  return NextResponse.json({ ok: true, product });
}

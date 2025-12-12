import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    paypal: true,
    stripe: true,
    status: "dual-checkout-ready"
  });
}

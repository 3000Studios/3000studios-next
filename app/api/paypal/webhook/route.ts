import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // TODO: Verify with PayPal webhook signature
  console.log("PayPal Webhook Event:", body.event_type);

  switch (body.event_type) {
    case "PAYMENT.CAPTURE.COMPLETED":
      console.log("Payment completed:", body.resource.id);
      break;
    case "PAYMENT.CAPTURE.DENIED":
      console.log("Payment denied");
      break;
  }

  return NextResponse.json({ received: true });
}

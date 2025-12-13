import { NextResponse } from "next/server";
import { paypalConfig } from "@/lib/paypal-config";

export async function POST(req: Request) {
  const { orderID } = await req.json();

  const res = await fetch(
    `https://api-m.${paypalConfig.environment}.paypal.com/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            paypalConfig.clientId + ":" + paypalConfig.clientSecret
          ).toString("base64"),
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}

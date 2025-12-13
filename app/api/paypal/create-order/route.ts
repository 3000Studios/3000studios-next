import { NextResponse } from "next/server";
import { paypalConfig } from "@/lib/paypal-config";

export async function POST() {
  const res = await fetch(
    `https://api-m.${paypalConfig.environment}.paypal.com/v2/checkout/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            paypalConfig.clientId + ":" + paypalConfig.clientSecret
          ).toString("base64"),
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          { amount: { currency_code: "USD", value: "49.00" } },
        ],
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20"
});

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "Automation Toolkit" },
        unit_amount: 4900
      },
      quantity: 1
    }],
    success_url: "https://3000studios.com/success",
    cancel_url: "https://3000studios.com/cancel"
  });

  return NextResponse.json({ url: session.url });
}

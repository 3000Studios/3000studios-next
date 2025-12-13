import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * IMPORTANT:
 * Do NOT set apiVersion.
 * Stripe SDK auto-locks to account version.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "AI Automation Toolkit",
          },
          unit_amount: 4900,
        },
        quantity: 1,
      },
    ],
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
  });

  return NextResponse.json({ url: session.url });
}

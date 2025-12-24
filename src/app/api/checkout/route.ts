import { NextRequest, NextResponse } from "next/server";
import { stripe, validateStripeKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    // Validate Stripe key is set at runtime
    validateStripeKey();
    
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/store?success=true`,
      cancel_url: `${req.nextUrl.origin}/store?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

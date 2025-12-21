import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
=======
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    
>>>>>>> origin/pr/50
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
<<<<<<< HEAD
        { status: 400 },
=======
        { status: 400 }
>>>>>>> origin/pr/50
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
<<<<<<< HEAD
      { status: 500 },
=======
      { status: 500 }
>>>>>>> origin/pr/50
    );
  }
}

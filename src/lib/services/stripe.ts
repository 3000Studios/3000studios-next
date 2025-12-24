import Stripe from "stripe";

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is missing. Please set it in your .env file.");
// }

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_mock_key",
  {
<<<<<<< HEAD
    apiVersion: "2025-12-15.clover", // Updated to match package type definition
=======
    apiVersion: "2025-11-17.clover", // Updated to latest API version
>>>>>>> origin/copilot/update-main-with-all-branches
    typescript: true,
  }
);

export async function createCheckoutSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  userId?: string
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    metadata: {
      userId: userId || null,
    },
  });

  return session;
}

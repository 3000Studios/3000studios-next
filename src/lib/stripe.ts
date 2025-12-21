import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is missing. Please set it in your .env file.",
  );
}

/**
 * Check if Stripe is configured
 */
export function isStripeConfigured(): boolean {
  return stripeInstance !== null;
}

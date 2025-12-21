import Stripe from "stripe";

<<<<<<< HEAD
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is missing. Please set it in your .env file.",
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia" as any, // TypeScript might complain about exact version string, casting to any or string is common
  typescript: true,
});
=======
/**
 * Stripe client instance
 * Initialized only if STRIPE_SECRET_KEY is available
 */
let stripeInstance: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia" as string as Stripe.LatestApiVersion,
    typescript: true,
  });
}

/**
 * Get Stripe instance
 * Throws error if not configured (at runtime, not build time)
 */
export function getStripe(): Stripe {
  if (!stripeInstance) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Please set it in your environment variables."
    );
  }
  return stripeInstance;
}

/**
 * Check if Stripe is configured
 */
export function isStripeConfigured(): boolean {
  return stripeInstance !== null;
}
>>>>>>> origin/pr/50

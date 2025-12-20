import Stripe from "stripe";

// Use a placeholder key during build time if not provided
// This allows the build to complete while still requiring the key at runtime
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-12-18.acacia" as any, // TypeScript might complain about exact version string, casting to any or string is common
  typescript: true,
});

// Runtime check - will throw error when API is actually called without proper key
export function validateStripeKey() {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder_for_build") {
    throw new Error(
      "STRIPE_SECRET_KEY is missing. Please set it in your .env file."
    );
  }
}

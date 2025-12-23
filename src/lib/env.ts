/**
 * Environment Variables Validation
 *
 * This module validates required environment variables at build time.
 * If any required variable is missing, the build will fail immediately.
 * This prevents silent runtime failures and ensures deployment safety.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, defaultValue: string = ""): string {
  return process.env[name] || defaultValue;
}

/**
 * Validated Environment Variables
 * Access these instead of process.env directly to ensure type safety
 */
export const ENV = {
  // Public variables (available in browser)
  SITE_URL: required("NEXT_PUBLIC_SITE_URL"),

  // Server-only variables (PayPal) - Optional for build
  PAYPAL_CLIENT_ID: optional("PAYPAL_CLIENT_ID"),
  PAYPAL_SECRET: optional("PAYPAL_SECRET"),

  // Server-only variables (AI Services) - Optional but recommended
  OPENAI_API_KEY: optional("OPENAI_API_KEY"),
  CLAUDE_API_KEY: optional("CLAUDE_API_KEY"),
  GEMINI_API_KEY: optional("GEMINI_API_KEY"),

  // Server-only variables (Google Services)
  GOOGLE_MAPS_API_KEY: optional("GOOGLE_MAPS_API_KEY"),

  // Server-only variables (Database)
  MONGO_PUBLIC_KEY: optional("MONGO_PUBLIC_KEY"),
  MONGO_PRIVATE_KEY: optional("MONGO_PRIVATE_KEY"),
  MONGO_IP: optional("MONGO_IP"),

  // Node environment
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Validate at module load time (build-time check)
if (typeof window === "undefined") {
  console.log("✅ Environment variables validated successfully");
  console.log(`📍 SITE_URL: ${ENV.SITE_URL}`);
  console.log(`🔧 NODE_ENV: ${ENV.NODE_ENV}`);
}

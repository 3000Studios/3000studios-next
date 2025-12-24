<<<<<<< HEAD
/**
 * Environment Variables Validation
 * 
 * This module validates required environment variables at build time.
 * If any required variable is missing, the build will fail immediately.
 * This prevents silent runtime failures and ensures deployment safety.
 */
=======
import { z } from "zod";
>>>>>>> origin/copilot/resolve-git-conflicts

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  MUX_TOKEN_ID: z.string().optional(),
  MUX_TOKEN_SECRET: z.string().optional(),
});

<<<<<<< HEAD
function optional(name: string, defaultValue: string = ''): string {
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
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Validate at module load time (build-time check)
if (typeof window === 'undefined') {
  console.log('✅ Environment variables validated successfully');
  console.log(`📍 SITE_URL: ${ENV.SITE_URL}`);
  console.log(`🔧 NODE_ENV: ${ENV.NODE_ENV}`);
}
=======
export const env = envSchema.parse(process.env);
>>>>>>> origin/copilot/resolve-git-conflicts

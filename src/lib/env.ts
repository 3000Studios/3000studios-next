/**
 * Environment Configuration
 * Provides safe access to environment variables with fallback values
 * for build-time when variables are not available
 */

/**
 * Get environment variable with optional fallback
 * During build, some variables may not be available but are set in deployment
 */
const getEnv = (name: string, fallback: string = ""): string => {
  return process.env[name] || fallback;
};

/**
 * Environment variables used in the application
 * Note: Most variables are configured in Vercel and not required at build time
 */
export const ENV = {
  // Site configuration - used for metadata
  SITE_URL: getEnv("NEXT_PUBLIC_SITE_URL", "https://3000studios.com"),
  BASE_URL: getEnv("NEXT_PUBLIC_BASE_URL", "https://3000studios.com"),
  
  // Runtime environment
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Public API keys (prefixed with NEXT_PUBLIC_)
  MAPS_API: getEnv("NEXT_PUBLIC_MAPS_API"),
  SIGNAL_SERVER: getEnv("NEXT_PUBLIC_SIGNAL_SERVER", "wss://signal.3000studios.com"),
};

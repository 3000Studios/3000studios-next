const getEnv = (name: string, fallback: string = ""): string => {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }
  return value;
};

export const ENV = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://3000studios.com",
  DATABASE_URL: getEnv("DATABASE_URL"),
  NEXTAUTH_URL: getEnv("NEXTAUTH_URL"),
  NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET"),
  STRIPE_SECRET_KEY: getEnv("STRIPE_SECRET_KEY"),
  STRIPE_PUBLISHABLE_KEY:
    process.env.STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLIC || "",
  STRIPE_WEBHOOK_SECRET: getEnv("STRIPE_WEBHOOK_SECRET"),
  PAYPAL_CLIENT_ID: getEnv("PAYPAL_CLIENT_ID"),
  PAYPAL_SECRET: process.env.PAYPAL_SECRET || process.env.PAYPAL_CLIENT_SECRET_PROD || "",
  OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
  GOOGLE_MAPS_API_KEY: getEnv("GOOGLE_MAPS_API_KEY"),
};

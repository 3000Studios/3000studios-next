export const isProd = process.env.PAYPAL_ENV === "production";

export const paypalConfig = {
  clientId: isProd
    ? process.env.PAYPAL_CLIENT_ID_PROD!
    : process.env.PAYPAL_CLIENT_ID!,
  clientSecret: isProd
    ? process.env.PAYPAL_CLIENT_SECRET_PROD!
    : process.env.PAYPAL_CLIENT_SECRET!,
  environment: isProd ? "production" : "sandbox",
};

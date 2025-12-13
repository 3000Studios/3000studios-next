import {
  Client,
  Environment,
  Configuration,
  OAuthTokenProvider,
} from "@paypal/paypal-server-sdk";

export function getPayPalClient() {
  const isProd = process.env.PAYPAL_ENV === "production";

  const config = new Configuration({
    environment: isProd ? Environment.Production : Environment.Sandbox,
    tokenProvider: new OAuthTokenProvider({
      clientId: isProd
        ? process.env.PAYPAL_CLIENT_ID_PROD!
        : process.env.PAYPAL_CLIENT_ID!,
      clientSecret: isProd
        ? process.env.PAYPAL_CLIENT_SECRET_PROD!
        : process.env.PAYPAL_CLIENT_SECRET!,
    }),
  });

  return new Client(config);
}

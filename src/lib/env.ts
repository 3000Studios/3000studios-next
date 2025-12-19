import { z } from "zod";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const optional = (name: string) => {
  return process.env[name];
};

export const ENV = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://3000studios.com",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://3000studios.com",
  SIGNAL_SERVER: process.env.NEXT_PUBLIC_SIGNAL_SERVER || "wss://signal.3000studios.com",
  MAPS_API: optional("NEXT_PUBLIC_MAPS_API"),
  DATABASE_URL: optional("DATABASE_URL"),
  NEXTAUTH_URL: optional("NEXTAUTH_URL"),
  NEXTAUTH_SECRET: optional("NEXTAUTH_SECRET"),
  GOOGLE_CLIENT_ID: optional("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: optional("GOOGLE_CLIENT_SECRET"),
  GITHUB_CLIENT_ID: optional("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: optional("GITHUB_CLIENT_SECRET"),
  STRIPE_SECRET_KEY: optional("STRIPE_SECRET_KEY"),
  STRIPE_PUBLISHABLE_KEY: optional("STRIPE_PUBLISHABLE_KEY"),
  STRIPE_WEBHOOK_SECRET: optional("STRIPE_WEBHOOK_SECRET"),
  SMTP_HOST: optional("SMTP_HOST"),
  SMTP_PORT: optional("SMTP_PORT"),
  SMTP_USER: optional("SMTP_USER"),
  SMTP_PASSWORD: optional("SMTP_PASSWORD"),
  PAYPAL_CLIENT_ID: optional("PAYPAL_CLIENT_ID"),
  PAYPAL_SECRET: optional("PAYPAL_SECRET"),
  AWS_ACCESS_KEY_ID: optional("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: optional("AWS_SECRET_ACCESS_KEY"),
  AWS_REGION: optional("AWS_REGION"),
  AWS_S3_BUCKET: optional("AWS_S3_BUCKET"),
  REDIS_URL: optional("REDIS_URL"),
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Keep env export for backwards compatibility
export const env = ENV;

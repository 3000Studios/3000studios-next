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

export const env = {
  DATABASE_URL: required("DATABASE_URL"),
  NEXTAUTH_URL: required("NEXTAUTH_URL"),
  NEXTAUTH_SECRET: required("NEXTAUTH_SECRET"),
  GOOGLE_CLIENT_ID: required("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: required("GOOGLE_CLIENT_SECRET"),
  GITHUB_CLIENT_ID: required("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: required("GITHUB_CLIENT_SECRET"),
  STRIPE_SECRET_KEY: required("STRIPE_SECRET_KEY"),
  STRIPE_PUBLISHABLE_KEY: required("STRIPE_PUBLISHABLE_KEY"),
  STRIPE_WEBHOOK_SECRET: required("STRIPE_WEBHOOK_SECRET"),
  SMTP_HOST: required("SMTP_HOST"),
  SMTP_PORT: required("SMTP_PORT"),
  SMTP_USER: required("SMTP_USER"),
  SMTP_PASSWORD: required("SMTP_PASSWORD"),
  PAYPAL_CLIENT_ID: optional("PAYPAL_CLIENT_ID"),
  PAYPAL_SECRET: optional("PAYPAL_SECRET"),
  AWS_ACCESS_KEY_ID: optional("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: optional("AWS_SECRET_ACCESS_KEY"),
  AWS_REGION: optional("AWS_REGION"),
  AWS_S3_BUCKET: optional("AWS_S3_BUCKET"),
  REDIS_URL: optional("REDIS_URL"),
  SITE_URL: optional("NEXT_PUBLIC_SITE_URL") || optional("NEXTAUTH_URL") || "https://3000studios.com",
  NODE_ENV: process.env.NODE_ENV || "development",
};

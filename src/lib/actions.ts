"use server";

import { signIn } from "@/auth";
// @ts-nocheck
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function sendEmergencyMagicLink(email: string) {
  try {
    // 1. Strict Security Enforcment
    if (email !== "mr.jwswain@gmail.com") {
      throw new Error("Unauthorized: This emergency button is restricted.");
    }

    // 2. Trigger Magic Link
    // Note: The 'nodemailer' provider in NextAuth (v5) is often invoked via signIn("nodemailer", ...)
    // which corresponds to the provider ID. Since we imported as Nodemailer, the default ID is "nodemailer".
    await signIn("nodemailer", { email, redirect: false });

    return {
      success: true,
      message: "Emergency link sent to secure admin email.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Failed to send link." };
    }
    throw error;
  }
}

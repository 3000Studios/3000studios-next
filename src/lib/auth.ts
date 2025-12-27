/**
 * Authentication helpers for admin access.
 * Note: For production use proper hashing + JWT signing.
 */

import jwt from "jsonwebtoken";

const ADMIN_CREDENTIALS = {
  email: process.env.MATRIX_ADMIN_EMAIL || "mr.jwswain@gmail.com",
  password: process.env.MATRIX_ADMIN_PASSWORD || "Bossman3000!!!",
};

const SESSION_DURATION_SECONDS =
  parseInt(process.env.SESSION_DURATION_HOURS || "24", 10) * 3600;

export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    email: string;
    role: string;
  };
}

export function verifyAdmin(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

export function createSessionToken(email: string): string {
  const secret = process.env.SESSION_SECRET || "dev-secret-key";
  const payload = {
    email,
    role: "admin",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };

  try {
    return jwt.sign(payload, secret);
  } catch (error) {
    console.error("Failed to create JWT token:", error);
    return Buffer.from(JSON.stringify(payload)).toString("base64");
  }
}

export function verifySessionToken(token: string): AuthResult {
  const secret = process.env.SESSION_SECRET || "dev-secret-key";

  try {
    const decoded = jwt.verify(token, secret) as { email: string; role: string };
    if (decoded.email === ADMIN_CREDENTIALS.email) {
      return {
        success: true,
        message: "Valid session",
        user: { email: decoded.email, role: decoded.role },
      };
    }
    return { success: false, message: "Invalid session" };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { success: false, message: "Session verification failed" };
  }
}

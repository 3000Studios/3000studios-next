/**
 * /api/auth/magic-link
 * Generates and sends a one-time magic link for passwordless authentication to /matrix
 */

<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
=======
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
>>>>>>> origin/copilot/update-main-with-all-branches

// Constants for token management
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const MAGIC_LINK_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

// Rate limiting: track requests per IP/email
// WARNING: In-memory rate limiting won't persist across restarts and won't work in multi-instance deployments
// For production, use Redis or a distributed cache for rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 magic link requests per 15 minutes

// In-memory store for magic link tokens (in production, use Redis or database)
// Use global store so it's shared across API routes
<<<<<<< HEAD
if (typeof globalThis !== "undefined") {
  if (!(globalThis as any).__magicTokens) {
    (globalThis as any).__magicTokens = new Map<
      string,
      { email: string; expires: number }
    >();

=======
if (typeof globalThis !== 'undefined') {
  if (!(globalThis as any).__magicTokens) {
    (globalThis as any).__magicTokens = new Map<string, { email: string; expires: number }>();
    
>>>>>>> origin/copilot/update-main-with-all-branches
    // PRODUCTION WARNING: This in-memory storage won't work correctly in:
    // - Multi-instance deployments (Vercel, AWS Lambda, etc.)
    // - Server restarts (tokens will be lost)
    // For production, implement Redis or a database-backed token store
<<<<<<< HEAD
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "⚠️  PRODUCTION WARNING: Using in-memory token storage. " +
          "This will not work correctly with multiple instances or server restarts. " +
          "Implement Redis or database storage for production use.",
      );
    }

=======
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '⚠️  PRODUCTION WARNING: Using in-memory token storage. ' +
        'This will not work correctly with multiple instances or server restarts. ' +
        'Implement Redis or database storage for production use.'
      );
    }
    
>>>>>>> origin/copilot/update-main-with-all-branches
    // Clean up expired tokens every 5 minutes
    setInterval(() => {
      const tokens = (globalThis as any).__magicTokens;
      const now = Date.now();
      for (const [token, data] of tokens.entries()) {
        if (data.expires < now) {
          tokens.delete(token);
        }
      }
    }, CLEANUP_INTERVAL_MS);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
<<<<<<< HEAD
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
=======
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
>>>>>>> origin/copilot/update-main-with-all-branches
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Invalid email format" },
        { status: 400 },
=======
        { error: 'Invalid email format' },
        { status: 400 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    // Check if email is authorized (only admin email can access matrix)
<<<<<<< HEAD
    const adminEmail =
      process.env.MATRIX_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    if (email !== adminEmail) {
      return NextResponse.json(
        { error: "Email not authorized for Matrix access" },
        { status: 403 },
=======
    const adminEmail = process.env.MATRIX_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    if (email !== adminEmail) {
      return NextResponse.json(
        { error: 'Email not authorized for Matrix access' },
        { status: 403 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    // Rate limiting: check requests for this email
    const rateLimitKey = email;
    const now = Date.now();
    const rateLimit = rateLimitMap.get(rateLimitKey);
<<<<<<< HEAD

=======
    
>>>>>>> origin/copilot/update-main-with-all-branches
    if (rateLimit) {
      if (now < rateLimit.resetTime) {
        if (rateLimit.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
<<<<<<< HEAD
            { error: "Too many requests. Please try again later." },
            { status: 429 },
=======
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
>>>>>>> origin/copilot/update-main-with-all-branches
          );
        }
        rateLimit.count++;
      } else {
        // Reset window
<<<<<<< HEAD
        rateLimitMap.set(rateLimitKey, {
          count: 1,
          resetTime: now + RATE_LIMIT_WINDOW_MS,
        });
      }
    } else {
      rateLimitMap.set(rateLimitKey, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex");
=======
        rateLimitMap.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      rateLimitMap.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex');
>>>>>>> origin/copilot/update-main-with-all-branches
    const expires = Date.now() + MAGIC_LINK_EXPIRY_MS;

    // Store token in global store
    const tokens = (globalThis as any).__magicTokens || new Map();
    tokens.set(token, { email, expires });

    // Generate magic link
<<<<<<< HEAD
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
=======
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
>>>>>>> origin/copilot/update-main-with-all-branches
    const magicLink = `${baseUrl}/matrix/auth?token=${token}`;

    // TODO: In production, send email via service like SendGrid, AWS SES, or Resend
    // For now, we'll return the link in the response (development mode)
    console.log(`🔗 Magic Link for ${email}: ${magicLink}`);
    console.log(`⏰ Expires in 15 minutes`);

    // Simulate email sending
    const emailSent = await sendMagicLinkEmail(email, magicLink);

    if (!emailSent) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Failed to send magic link email" },
        { status: 500 },
=======
        { error: 'Failed to send magic link email' },
        { status: 500 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    return NextResponse.json({
      success: true,
<<<<<<< HEAD
      message: "Magic link sent to your email",
      // Include link in development mode only
      ...(process.env.NODE_ENV === "development" && { magicLink }),
    });
  } catch (error) {
    console.error("Magic link error:", error);
    return NextResponse.json(
      { error: "Failed to generate magic link" },
      { status: 500 },
=======
      message: 'Magic link sent to your email',
      // Include link in development mode only
      ...(process.env.NODE_ENV === 'development' && { magicLink }),
    });
  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json(
      { error: 'Failed to generate magic link' },
      { status: 500 }
>>>>>>> origin/copilot/update-main-with-all-branches
    );
  }
}

<<<<<<< HEAD
async function sendMagicLinkEmail(
  email: string,
  magicLink: string,
): Promise<boolean> {
  try {
    // In production, integrate with email service
    // Example with SendGrid, AWS SES, Resend, etc.

    // For development, log to console
    console.log("\n═══════════════════════════════════════════════════════");
    console.log("📧 MAGIC LINK EMAIL");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`To: ${email}`);
    console.log(`Subject: Your Magic Link to The Matrix`);
    console.log("\nClick the link below to access The Matrix:\n");
    console.log(magicLink);
    console.log("\nThis link expires in 15 minutes.");
    console.log("═══════════════════════════════════════════════════════\n");
=======
async function sendMagicLinkEmail(email: string, magicLink: string): Promise<boolean> {
  try {
    // In production, integrate with email service
    // Example with SendGrid, AWS SES, Resend, etc.
    
    // For development, log to console
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📧 MAGIC LINK EMAIL');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`To: ${email}`);
    console.log(`Subject: Your Magic Link to The Matrix`);
    console.log('\nClick the link below to access The Matrix:\n');
    console.log(magicLink);
    console.log('\nThis link expires in 15 minutes.');
    console.log('═══════════════════════════════════════════════════════\n');
>>>>>>> origin/copilot/update-main-with-all-branches

    // TODO: Implement actual email sending
    // Example:
    // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email }] }],
    //     from: { email: 'noreply@3000studios.com' },
    //     subject: 'Your Magic Link to The Matrix',
    //     content: [{
    //       type: 'text/html',
    //       value: `<h1>Access The Matrix</h1><p><a href="${magicLink}">Click here to login</a></p>`,
    //     }],
    //   }),
    // });
    // return response.ok;

    return true; // Return true for development
  } catch (error) {
<<<<<<< HEAD
    console.error("Email send error:", error);
=======
    console.error('Email send error:', error);
>>>>>>> origin/copilot/update-main-with-all-branches
    return false;
  }
}

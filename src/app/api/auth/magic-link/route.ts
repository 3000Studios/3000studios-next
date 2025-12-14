/**
 * /api/auth/magic-link
 * Generates and sends a one-time magic link for passwordless authentication to /matrix
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Constants for token management
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const MAGIC_LINK_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

// In-memory store for magic link tokens (in production, use Redis or database)
// Use global store so it's shared across API routes
if (typeof globalThis !== 'undefined') {
  if (!(globalThis as any).__magicTokens) {
    (globalThis as any).__magicTokens = new Map<string, { email: string; expires: number }>();
    
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
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email is authorized (only admin email can access matrix)
    const adminEmail = process.env.ADMIN_EMAIL || process.env.MATRIX_ADMIN_EMAIL;
    if (email !== adminEmail) {
      return NextResponse.json(
        { error: 'Email not authorized for Matrix access' },
        { status: 403 }
      );
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + MAGIC_LINK_EXPIRY_MS;

    // Store token in global store
    const tokens = (globalThis as any).__magicTokens || new Map();
    tokens.set(token, { email, expires });

    // Generate magic link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const magicLink = `${baseUrl}/matrix/auth?token=${token}`;

    // TODO: In production, send email via service like SendGrid, AWS SES, or Resend
    // For now, we'll return the link in the response (development mode)
    console.log(`🔗 Magic Link for ${email}: ${magicLink}`);
    console.log(`⏰ Expires in 15 minutes`);

    // Simulate email sending
    const emailSent = await sendMagicLinkEmail(email, magicLink);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send magic link email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email',
      // Include link in development mode only
      ...(process.env.NODE_ENV === 'development' && { magicLink }),
    });
  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json(
      { error: 'Failed to generate magic link' },
      { status: 500 }
    );
  }
}

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
    console.error('Email send error:', error);
    return false;
  }
}

// Export function to verify magic link tokens
export function verifyMagicToken(token: string): { valid: boolean; email?: string } {
  const tokens = (globalThis as any).__magicTokens || new Map();
  const data = tokens.get(token);
  
  if (!data) {
    return { valid: false };
  }

  if (data.expires < Date.now()) {
    tokens.delete(token);
    return { valid: false };
  }

  // Delete token after use (one-time use)
  tokens.delete(token);
  
  return { valid: true, email: data.email };
}

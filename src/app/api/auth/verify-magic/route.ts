/**
 * /api/auth/verify-magic
 * Verifies magic link token and creates session
 */

import { createSessionToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Share the same token store with magic-link route via globalThis
// In production, this would be Redis or database

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Get tokens from global store
    const tokens = (globalThis as any).__magicTokens || new Map();
    const data = tokens.get(token);

    if (!data) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (data.expires < Date.now()) {
      tokens.delete(token);
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 401 }
      );
    }

    // Token is valid - delete it (one-time use)
    tokens.delete(token);

    // Create session token
    const sessionToken = createSessionToken(data.email);

    return NextResponse.json(
      {
        success: true,
        message: 'Authentication successful',
        user: {
          email: data.email,
          role: 'admin',
        },
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `auth_token=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
        },
      }
    );
  } catch (error) {
    console.error('Magic link verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}

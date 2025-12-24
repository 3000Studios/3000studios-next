/**
 * /api/auth/verify-magic
 * Verifies magic link token and creates session
 */

<<<<<<< HEAD
import { createSessionToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Session duration (configurable via env var, default 24 hours)
const SESSION_DURATION_SECONDS =
  parseInt(process.env.SESSION_DURATION_HOURS || "24", 10) * 3600;
=======
import { createSessionToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Session duration (configurable via env var, default 24 hours)
const SESSION_DURATION_SECONDS = parseInt(process.env.SESSION_DURATION_HOURS || '24', 10) * 3600;
>>>>>>> origin/copilot/update-main-with-all-branches

// Share the same token store with magic-link route via globalThis
// In production, this would be Redis or database

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
<<<<<<< HEAD
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
=======
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
>>>>>>> origin/copilot/update-main-with-all-branches
    }

    // Get tokens from global store
    const tokens = (globalThis as any).__magicTokens || new Map();
    const data = tokens.get(token);

    if (!data) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Invalid or expired token" },
        { status: 401 },
=======
        { error: 'Invalid or expired token' },
        { status: 401 }
>>>>>>> origin/copilot/update-main-with-all-branches
      );
    }

    if (data.expires < Date.now()) {
      tokens.delete(token);
<<<<<<< HEAD
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
=======
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 401 }
      );
>>>>>>> origin/copilot/update-main-with-all-branches
    }

    // Token is valid - delete it (one-time use)
    tokens.delete(token);

    // Create session token
    const sessionToken = createSessionToken(data.email);

    return NextResponse.json(
      {
        success: true,
<<<<<<< HEAD
        message: "Authentication successful",
        token: sessionToken,
        user: {
          email: data.email,
          role: "admin",
=======
        message: 'Authentication successful',
        token: sessionToken,
        user: {
          email: data.email,
          role: 'admin',
>>>>>>> origin/copilot/update-main-with-all-branches
        },
      },
      {
        status: 200,
        headers: {
<<<<<<< HEAD
          "Set-Cookie": `auth_token=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}`,
        },
      },
    );
  } catch (error) {
    console.error("Magic link verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
=======
          'Set-Cookie': `auth_token=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}`,
        },
      }
    );
  } catch (error) {
    console.error('Magic link verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
>>>>>>> origin/copilot/update-main-with-all-branches
  }
}

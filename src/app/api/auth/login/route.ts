/**
 * /api/auth/login
 * Validates credentials and returns session token
 */

import { createSessionToken, verifyAdmin } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

<<<<<<< HEAD
=======
// Session duration (configurable via env var, default 24 hours)
const SESSION_DURATION_SECONDS = parseInt(process.env.SESSION_DURATION_HOURS || '24', 10) * 3600;

>>>>>>> origin/copilot/update-main-with-all-branches
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const result = verifyAdmin(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 401 }
      );
    }

    const token = createSessionToken(email);

    // Return token to be stored in httpOnly cookie by client
    return NextResponse.json(
      {
        success: true,
        token,
        user: result.user,
      },
      {
        status: 200,
        headers: {
<<<<<<< HEAD
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
=======
          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}`,
>>>>>>> origin/copilot/update-main-with-all-branches
        },
      }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

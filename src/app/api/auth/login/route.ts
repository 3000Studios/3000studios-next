/**
 * /api/auth/login
 * Validates credentials and returns session token
 */

import { createSessionToken, verifyAdmin } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

          'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}`,
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

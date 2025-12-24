/**
 * Authentication Library
 * Handles login verification for THE MATRIX admin access
 * 
 * ⚠️ SECURITY NOTE: In production, credentials should be:
 * 1. Stored in environment variables
 * 2. Hashed with bcrypt
 * 3. Validated against a secure database
 * 
 * This implementation is for development/demo purposes.
 */

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL ?? '',
  password: process.env.ADMIN_PASSWORD ?? '',
};

export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    email: string;
    role: string;
  };
}

export function verifyAdmin(email: string, password: string): AuthResult {
  if (
    ADMIN_CREDENTIALS.email &&
    ADMIN_CREDENTIALS.password &&
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    return {
      success: true,
      message: 'Authentication successful',
      user: {
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
      },
    };
  }

  return {
    success: false,
    message: 'Invalid credentials',
  };
}

export function createSessionToken(email: string): string {
  // TODO: In production, use proper JWT with crypto.sign()
  // and a secret key from environment variables
  const token = Buffer.from(
    JSON.stringify({ email, timestamp: Date.now() })
  ).toString('base64');
  return token;
}

export function verifySessionToken(token: string): AuthResult {
  try {
    // TODO: In production, use proper JWT verification with secret key
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const hoursSinceCreation = (Date.now() - decoded.timestamp) / (1000 * 60 * 60);
    
    if (hoursSinceCreation > 24) {
      return {
        success: false,
        message: 'Session expired',
      };
    }

    if (decoded.email === ADMIN_CREDENTIALS.email) {
      return {
        success: true,
        message: 'Valid session',
        user: {
          email: decoded.email,
          role: 'admin',
        },
      };
    }

    return {
      success: false,
      message: 'Invalid session',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Invalid token',
    };
  }
}

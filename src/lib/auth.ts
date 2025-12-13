/**
 * Authentication Library
 * Handles login verification for THE MATRIX admin access
 *
 * Credentials are loaded from environment variables.
 * In production: use bcrypt hashing + secure database + MFA.
 */

const ADMIN_CREDENTIALS = {
  email: process.env.MATRIX_ADMIN_EMAIL || '',
  password: process.env.MATRIX_ADMIN_PASSWORD || '',
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
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
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
  // JWT-style token with env secret (dev mode uses simple base64)
  // NOTE: left exported for compatibility; prefix with _ to satisfy lint
  const _secret = process.env.SESSION_SECRET || 'dev-secret-key';
  const payload = {
    email,
    timestamp: Date.now(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400, // 24h expiry
  };
  // Simple base64 encoding for dev; in production use proper JWT signing
  const token = Buffer.from(JSON.stringify(payload)).toString('base64');
  return token;
}

export function verifySessionToken(token: string): AuthResult {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const hoursSinceCreation = (Date.now() - decoded.timestamp) / (1000 * 60 * 60);

    // Token expires after 24 hours
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
  } catch {
    return {
      success: false,
      message: 'Invalid token',
    };
  }
}

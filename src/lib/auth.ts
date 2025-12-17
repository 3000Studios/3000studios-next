/**
 * Authentication Library
 * Handles login verification for THE MATRIX admin access
 *
 * Credentials are loaded from environment variables.
 * In production: use bcrypt hashing + secure database + MFA.
 */

import jwt from 'jsonwebtoken';

const ADMIN_CREDENTIALS = {
  email: process.env.MATRIX_ADMIN_EMAIL || '',
  password: process.env.MATRIX_ADMIN_PASSWORD || '',
};

// Session duration (configurable via env var, default 24 hours)
const SESSION_DURATION_SECONDS = parseInt(process.env.SESSION_DURATION_HOURS || '24', 10) * 3600;

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
  const secret = process.env.SESSION_SECRET || 'dev-secret-key';
  
  // SECURITY: Warn if using insecure default secret in production
  if (process.env.NODE_ENV === 'production' && secret === 'dev-secret-key') {
    console.error('SECURITY WARNING: SESSION_SECRET not set in production! Using insecure default.');
  }
  
  const payload = {
    email,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  
  // Use proper JWT signing with secret
  try {
    return jwt.sign(payload, secret);
  } catch (error) {
    console.error('Failed to create JWT token:', error);
    // Fallback to base64 for development only
    if (process.env.NODE_ENV !== 'production') {
      return Buffer.from(JSON.stringify(payload)).toString('base64');
    }
    throw new Error('Failed to create session token');
  }
}

export function verifySessionToken(token: string): AuthResult {
  const secret = process.env.SESSION_SECRET || 'dev-secret-key';
  
  try {
    // Try JWT verification first
    const decoded = jwt.verify(token, secret) as { email: string; role: string; exp: number };
    
    if (decoded.email === ADMIN_CREDENTIALS.email) {
      return {
        success: true,
        message: 'Valid session',
        user: {
          email: decoded.email,
          role: decoded.role || 'admin',
        },
      };
    }
    
    return {
      success: false,
      message: 'Invalid session',
    };
  } catch {
    // Fallback: try base64 decoding for backward compatibility with dev tokens
    if (process.env.NODE_ENV !== 'production') {
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        const secondsSinceCreation = (Date.now() - (decoded.iat * 1000)) / 1000;
        
        if (secondsSinceCreation > SESSION_DURATION_SECONDS) {
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
      } catch {
        // Fall through to invalid token
      }
    }
    
    return {
      success: false,
      message: 'Invalid token',
    };
  }
}

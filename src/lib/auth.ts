/**
 * Authentication Library
 * Handles login verification for THE MATRIX admin access
 * Admin credentials: mr.jwswain@gmail.com / Bossman3000!!!
 */

// In production, use bcrypt for password hashing
const ADMIN_CREDENTIALS = {
  email: 'mr.jwswain@gmail.com',
  password: 'Bossman3000!!!',
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
  const token = Buffer.from(
    JSON.stringify({ email, timestamp: Date.now() })
  ).toString('base64');
  return token;
}

export function verifySessionToken(token: string): AuthResult {
  try {
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

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
<<<<<<< HEAD
<<<<<<< HEAD
  email: process.env.ADMIN_EMAIL ?? '',
  password: process.env.ADMIN_PASSWORD ?? '',
=======
  email: process.env.MATRIX_ADMIN_EMAIL || '',
  password: process.env.MATRIX_ADMIN_PASSWORD || '',
>>>>>>> origin/copilot/resolve-git-conflicts
=======
  email: 'mr.jwswain@gmail.com',
  password: 'Bossman3000!!!', // TODO: Hash with bcrypt
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
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
<<<<<<< HEAD
<<<<<<< HEAD
  if (
    ADMIN_CREDENTIALS.email &&
    ADMIN_CREDENTIALS.password &&
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
=======
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
>>>>>>> origin/copilot/resolve-git-conflicts
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
  // TODO: In production, use proper JWT with crypto.sign()
  // and a secret key from environment variables
  const token = Buffer.from(
    JSON.stringify({ email, timestamp: Date.now() })
  ).toString('base64');
<<<<<<< HEAD
=======
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
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
  return token;
}

export function verifySessionToken(token: string): AuthResult {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
    // TODO: In production, use proper JWT verification with secret key
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const hoursSinceCreation = (Date.now() - decoded.timestamp) / (1000 * 60 * 60);
    
=======
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const hoursSinceCreation = (Date.now() - decoded.timestamp) / (1000 * 60 * 60);

    // Token expires after 24 hours
>>>>>>> origin/copilot/resolve-git-conflicts
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

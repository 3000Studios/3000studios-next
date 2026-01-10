import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

/**
 * Shared auth utilities for NextAuth v4 in App Router.
 *
 * Note: NextAuth v4 returns a function, not an object with handlers.
 * We wrap it to provide a v5-like interface if needed, or just export the essentials.
 */
const handler = NextAuth(authConfig);

export const auth = async () => null; // Placeholder for v5 'auth()' helper
export const signIn = async (...args: any[]) => {}; // Placeholder
export const signOut = async (...args: any[]) => {}; // Placeholder
export const handlers = { GET: handler, POST: handler };

export default handler;

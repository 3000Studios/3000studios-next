import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const auth = NextAuth(authConfig);
export const signIn = NextAuth(authConfig).signIn;
export const signOut = NextAuth(authConfig).signOut;
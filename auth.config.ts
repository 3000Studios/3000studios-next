import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        const adminEmail = process.env.MATRIX_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'mr.jwswain@gmail.com';
        const adminPassword = process.env.MATRIX_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'Bossman3000!!!';

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: 'admin',
            email: credentials.email,
            name: 'Admin',
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: URL } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
};

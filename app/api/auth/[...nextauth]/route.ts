import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error('Admin credentials not configured');
          return null;
        }

        if (email === adminEmail && password === adminPassword) {
          // Set simple auth cookie for middleware-based admin lock
          cookies().set('admin-auth', 'true');
          return { id: 'admin' } as any;
        }

        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
});

export { handler as GET, handler as POST };

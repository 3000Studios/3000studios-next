import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPasswordHash) {
          console.error('Admin credentials not configured');
          return null;
        }

        if (credentials.email !== adminEmail) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);

        if (isValid) {
          return {
            id: '1',
            email: adminEmail,
            name: 'Admin',
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };

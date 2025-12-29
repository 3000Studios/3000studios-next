import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Protect all /admin routes except /admin (login page)
      const path = req.nextUrl.pathname;
      if (path.startsWith('/admin') && path !== '/admin') {
        return !!token;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};

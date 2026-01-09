import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate request
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // Check credentials
    // We prioritize ADMIN_PASSWORD, but fallback to ADMIN_SECRET for compatibility
    const validPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;
    const validEmail = process.env.ADMIN_EMAIL;

    if (!validPassword) {
      console.error('Server missing ADMIN_PASSWORD or ADMIN_SECRET env var');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const passwordMatch = password === validPassword;
    // If ADMIN_EMAIL is set, we require email match too. If not, we ignore email.
    const emailMatch = validEmail ? email === validEmail : true;

    if (!passwordMatch || !emailMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set('admin', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

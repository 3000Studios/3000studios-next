import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (!path.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (path === '/admin/login') {
    return NextResponse.next()
  }

  const admin = req.cookies.get('admin')
  if (!admin) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

import { NextRequest, NextResponse } from 'next/server'

// List of public paths that don't require auth
const publicPaths = [
  '/login',
  '/signup',
  '/_next',
  '/favicon.ico'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}
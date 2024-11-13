import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export default function DomainMiddleware(
  request: NextRequest,
  response: NextResponse,
  user: User | null,
  hostname: string,
) {
  const url = request.nextUrl
  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const rewrittenUrl = new URL(`/${hostname}${path}`, request.url)
  response = NextResponse.rewrite(rewrittenUrl)

  return response
}

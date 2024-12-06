import { VALID_APP_ROUTES } from '@/lib/constants'
import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export default function AppMiddleware(
  request: NextRequest,
  response: NextResponse,
  user: User | null,
) {
  const url = request.nextUrl
  const searchParams = request.nextUrl.searchParams.toString()
  const path = url.pathname
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!VALID_APP_ROUTES.includes(path)) {
    return NextResponse.rewrite(new URL(`/bckgrnd/not-found`, request.url))
  }

  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const rewrittenUrl = new URL(`/app${fullPath}`, request.url)
  response = NextResponse.rewrite(rewrittenUrl)

  return response
}

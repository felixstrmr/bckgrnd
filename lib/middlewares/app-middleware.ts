import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

type Props = {
  request: NextRequest
  response: NextResponse
  user: User | null
}

export default async function AppMiddleware({ request, user, response }: Props) {
  const url = request.nextUrl
  const searchParams = url.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const rewrittenUrl = new URL(`/app${path === '/' ? '' : path}`, request.url)
  response = NextResponse.rewrite(rewrittenUrl)

  return response
}

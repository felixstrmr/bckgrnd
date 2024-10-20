import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

type Props = {
  request: NextRequest
  response: NextResponse
  hostname: string
  user: User | null
}

export default async function DomainMiddleware({
  request,
  response,
  hostname,
  user,
}: Props) {
  const url = request.nextUrl
  const searchParams = url.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const rewrittenUrl = new URL(`/${hostname}${path}`, request.url)
  response = NextResponse.rewrite(rewrittenUrl)

  return response
}

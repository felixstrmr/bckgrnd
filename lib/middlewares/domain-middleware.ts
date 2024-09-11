import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

type Props = {
  request: NextRequest
  user: User | null
}

export default function DomainMiddleware({ request, user }: Props) {
  const url = request.nextUrl
  const path = url.pathname
  const hostname = request.headers.get('host')!

  /*
  const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN

  
  const domain =
    rootDomain && hostname.endsWith(`.${rootDomain}`)
      ? hostname.slice(0, -rootDomain.length - 1)
      : hostname
      */

  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url))
}

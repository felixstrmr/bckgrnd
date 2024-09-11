import { PROTECTED_HOME_ROUTES } from '@/lib/constants'
import { User } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

type Props = {
  request: NextRequest
  user: User | null
}

export default function HomeMiddleware({ request, user }: Props) {
  const url = request.nextUrl
  const path = url.pathname

  if (PROTECTED_HOME_ROUTES.includes(path) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.rewrite(
    new URL(`/home${path === '/' ? '' : path}`, request.url),
  )
}

import { env } from '@/lib/env'
import AppMiddleware from '@/lib/middlewares/app-middleware'
import DomainMiddleware from '@/lib/middlewares/domain-middleware'
import HomeMiddleware from '@/lib/middlewares/home-middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let hostname = request.headers.get('host')!

  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  }

  if (hostname === env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return HomeMiddleware({ request })
  }

  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return AppMiddleware({ request, response, user })
  }

  return DomainMiddleware({ request, response, hostname, user })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

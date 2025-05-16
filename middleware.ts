import { supabaseMiddlewareClient } from '@/lib/clients/supabase/middleware'
import { env } from '@/lib/env'
import HomeMiddleware from '@/lib/middlewares/home-middleware'
import WorkspaceMiddleware from '@/lib/middlewares/workspace-middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host')!

  const isHomeRoute =
    host === `www.${env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    host === env.NEXT_PUBLIC_ROOT_DOMAIN

  if (isHomeRoute) {
    return HomeMiddleware(request)
  }

  const { response, user } = await supabaseMiddlewareClient(request)

  return WorkspaceMiddleware(request, response, user)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

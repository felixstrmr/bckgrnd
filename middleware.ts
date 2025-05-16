import { supabaseMiddlewareClient } from '@/lib/clients/supabase/middleware'
import WorkspaceMiddleware from '@/lib/middlewares/workspace-middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { response, user } = await supabaseMiddlewareClient(request)

  return WorkspaceMiddleware(request, response, user)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

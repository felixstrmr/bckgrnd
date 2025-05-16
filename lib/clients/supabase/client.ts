import { env } from '@/lib/env'
import { Database } from '@/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

export function supabaseClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        domain: `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
      },
    },
  )
}

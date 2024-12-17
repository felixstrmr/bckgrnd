import { createClient } from '@/lib/clients/supabase/server'
import { env } from '@/lib/env'
import { getSessionWithCache } from '@/queries/cached/auth'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()

  const requestUrl = new URL(req.url)
  const path = requestUrl.searchParams.get('path')

  const session = await getSessionWithCache(supabase)

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${path}`, {
    headers: {
      authorization: `Bearer ${session?.access_token}`,
    },
  })
}

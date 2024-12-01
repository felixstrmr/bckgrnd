import { env } from '@/lib/env'
import { getSessionWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()

  const requestUrl = new URL(req.url)
  const filePath = requestUrl.searchParams.get('filePath')

  const session = await getSessionWithCache(supabase)

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return fetch(
    `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${filePath}`,
    {
      headers: {
        authorization: `Bearer ${session?.access_token}`,
      },
    },
  )
}

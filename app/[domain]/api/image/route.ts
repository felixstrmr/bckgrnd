import { createClient } from '@/lib/clients/supabase/server'
import { env } from '@/lib/env'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()

  const requestUrl = new URL(req.url)
  const path = requestUrl.searchParams.get('path')

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${path}`, {
    headers: {
      authorization: `Bearer ${session?.access_token}`,
    },
  })
}

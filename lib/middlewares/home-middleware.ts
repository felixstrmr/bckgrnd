import { VALID_HOME_ROUTES } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export default function HomeMiddleware(request: NextRequest) {
  const url = request.nextUrl
  const path = url.pathname
  const searchParams = url.searchParams.toString()
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!VALID_HOME_ROUTES.includes(path)) {
    return NextResponse.rewrite(new URL('/bckgrnd/not-found', request.url))
  }

  return NextResponse.rewrite(new URL(`/home${fullPath}`, request.url))
}

import { VALID_APP_ROUTES } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export default function AppMiddleware(request: NextRequest) {
  const url = request.nextUrl
  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  if (!VALID_APP_ROUTES.includes(path)) {
    return NextResponse.rewrite(new URL(`/bckgrnd/not-found`, request.url))
  }

  return NextResponse.rewrite(
    new URL(`/app${path === '/' ? '' : path}`, request.url),
  )
}

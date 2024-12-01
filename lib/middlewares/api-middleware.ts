import { NextRequest, NextResponse } from 'next/server'

export default function ApiMiddleware(
  request: NextRequest,
  response: NextResponse,
) {
  const url = request.nextUrl
  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  const rewrittenUrl = new URL(`/api${path === '/' ? '' : path}`, request.url)
  response = NextResponse.rewrite(rewrittenUrl)

  return response
}

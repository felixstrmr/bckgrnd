import { NextRequest, NextResponse } from 'next/server'

type Props = {
  request: NextRequest
}

export default function HomeMiddleware({ request }: Props) {
  const url = request.nextUrl
  const searchParams = url.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, request.url))
}

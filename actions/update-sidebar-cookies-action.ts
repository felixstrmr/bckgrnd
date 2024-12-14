'use server'

import { cookies } from 'next/headers'

export async function updateSidebarCookies(collapsed: boolean) {
  const cookieStore = await cookies()

  cookieStore.set('sidebar:state', collapsed ? 'true' : 'false')
}

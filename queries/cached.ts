import { supabaseServerClient } from '@/lib/clients/supabase/server'
import { getWorkspaceUserQuery } from '@/queries'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getWorkspaceUser = cache(async (domain: string) => {
  const supabase = await supabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return unstable_cache(
    async () => {
      return getWorkspaceUserQuery(supabase, domain, user.id)
    },
    ['workspace-user', domain, user.id],
    {
      tags: [`workspace-${domain}`, `workspace-user-${user.id}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

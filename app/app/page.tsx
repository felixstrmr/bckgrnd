import { env } from '@/lib/env'
import { getDefaultWorkspace } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()
  const workspace = await getDefaultWorkspace(supabase)

  if (!workspace?.data?.domain) {
    return redirect('/setup')
  }

  const domain = workspace.data.domain.includes('.')
    ? workspace.data.domain
    : `${workspace.data.domain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`

  const redirectUrl = new URL(
    `${env.NEXT_PUBLIC_PROTOCOL}://${domain}/dashboard`,
  ).toString()

  return redirect(redirectUrl)
}

import PortalSidebar from '@/components/sidebars/portal-sidebar'
import { getWorkspaceWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
  children: React.ReactNode
}

export default async function PortalLayout({ children, params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const workspace = await getWorkspaceWithCache(supabase, domain)

  return (
    <div className='flex size-full overflow-hidden bg-muted'>
      <PortalSidebar workspace={workspace} />
      <div className='flex size-full flex-col overflow-hidden py-2 pr-2'>
        <div className='size-full overflow-hidden rounded-lg border bg-background shadow-sm'>
          {children}
        </div>
      </div>
    </div>
  )
}

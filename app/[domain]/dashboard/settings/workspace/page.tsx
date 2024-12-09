import UpdateWorkspaceNameForm from '@/components/forms/update-workspace-name-form'
import { getWorkspaceWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const workspace = await getWorkspaceWithCache(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-6 px-6 pb-6'>
      <div className='space-y-2'>
        <h3>General</h3>
        <p className='text-sm text-muted-foreground'>
          Manage your general workspace settings.
        </p>
      </div>
      <UpdateWorkspaceNameForm workspace={workspace} />
    </div>
  )
}

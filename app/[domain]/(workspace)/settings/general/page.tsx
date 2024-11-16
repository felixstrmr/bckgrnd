import UpdateWorkspaceNameForm from '@/components/forms/update-workspace-name-form'
import { Separator } from '@/components/ui/separator'
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
    <div className='flex size-full flex-col px-6'>
      <div className='flex w-full flex-col'>
        <h4>General</h4>
        <p className='text-sm text-muted-foreground'>
          Manage your workspace settings and preferences.
        </p>
        <Separator className='mb-6 mt-4' />
      </div>
      <UpdateWorkspaceNameForm workspace={workspace} />
    </div>
  )
}

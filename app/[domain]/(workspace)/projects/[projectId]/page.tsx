import { getProjectWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const project = await getProjectWithCache(supabase, domain, projectId)

  if (!project) return notFound()

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <h3>{project.name}</h3>
    </div>
  )
}

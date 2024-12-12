import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getProject } from '@/queries'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const project = await getProject(supabase, domain, projectId)

  if (!project) return notFound()

  return <div className='flex size-full'></div>
}

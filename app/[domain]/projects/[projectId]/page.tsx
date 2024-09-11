import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    domain: string
    projectId: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    '',
  )

  const { data: project, error } = await supabase
    .from('projects')
    .select('*, workspace:workspaces(domain)')
    .eq('id', params.projectId)
    .eq('workspace.domain', domain)
    .single()

  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  if (!project) return notFound()

  return (
    <div className='flex size-full p-6'>
      <h3>{project.name}</h3>
    </div>
  )
}

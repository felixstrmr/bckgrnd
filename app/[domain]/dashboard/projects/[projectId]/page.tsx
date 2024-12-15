import UpdateProjectForm from '@/components/forms/update-project-form'
import { createClient } from '@/lib/clients/supabase/server'
import { formatRelativeTime, getDomain } from '@/lib/utils'
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

  return (
    <div className='flex size-full flex-col space-y-6 py-6'>
      <div className='mx-auto mt-12 w-full max-w-2xl'>
        <div className='mb-9 flex items-center gap-2 text-muted-foreground'>
          <div className='rounded-full border border-dashed bg-background p-1 px-2 text-xs shadow'>
            Created {formatRelativeTime(new Date(project.created_at))}
          </div>
        </div>
        <UpdateProjectForm project={project} />
      </div>
    </div>
  )
}

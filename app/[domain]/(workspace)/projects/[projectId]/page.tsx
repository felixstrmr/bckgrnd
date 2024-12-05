import RevalidateTagButton from '@/components/buttons/revalidate-button'
import UpdateProjectForm from '@/components/forms/update-project-form'
import {
  getProjectStatusesWithCache,
  getProjectWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { formatRelativeTime, getDomain } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [project, projectStatuses] = await Promise.all([
    getProjectWithCache(supabase, domain, projectId),
    getProjectStatusesWithCache(supabase, domain),
  ])

  if (!project) return notFound()

  return (
    <div className='flex size-full flex-col space-y-12 p-6'>
      <RevalidateTagButton
        tag={`projects-${domain}-${projectId}`}
        className='ml-auto'
      />
      <div className='mx-auto w-full max-w-3xl'>
        <div className='space-y-2'>
          <p className='mb-7 w-fit rounded-lg border border-dashed p-1 px-2 text-xs text-muted-foreground'>
            Created {formatRelativeTime(new Date(project.created_at))}
          </p>
          <UpdateProjectForm
            project={project}
            projectStatuses={projectStatuses}
          />
        </div>
      </div>
    </div>
  )
}

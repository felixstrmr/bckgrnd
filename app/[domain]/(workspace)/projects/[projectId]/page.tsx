import RevalidateTagButton from '@/components/buttons/revalidate-button'
import DynamicIcon from '@/components/dynamic-icon'
import { getProjectWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { formatRelativeTime, getDomain } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarMinus, CalendarPlus, User } from 'lucide-react'
import Link from 'next/link'
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

  const startDate = project.start_date
    ? format(new Date(project.start_date), 'PP')
    : 'No date'

  const endDate = project.end_date
    ? format(new Date(project.end_date), 'PP')
    : 'No date'

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
          <h3>{project.name}</h3>
          {project.description ? (
            <p className='text-muted-foreground'>{project.description}</p>
          ) : (
            <p className='text-sm text-muted-foreground'>No description</p>
          )}
        </div>
        <div className='mt-9 flex items-center space-x-2'>
          <div className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
            <DynamicIcon
              icon={project.status.icon}
              style={{ color: project.status.color }}
              className='size-3'
            />
            <p className='text-xs'>{project.status.name}</p>
          </div>
          <Link
            href={`/clients/${project.client.id}`}
            className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'
          >
            <User className='size-3 text-muted-foreground' />
            <p className='text-xs'>{project.client.name}</p>
          </Link>
          <div className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
            <CalendarPlus className='size-3 text-muted-foreground' />
            <p className='text-xs'>{startDate}</p>
          </div>
          <div className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
            <CalendarMinus className='size-3 text-muted-foreground' />
            <p className='text-xs'>{endDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

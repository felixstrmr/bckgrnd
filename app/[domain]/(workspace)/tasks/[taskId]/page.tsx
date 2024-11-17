import RevalidateTagButton from '@/components/buttons/revalidate-button'
import { buttonVariants } from '@/components/ui/button'
import { getTaskWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const task = await getTaskWithCache(supabase, domain, taskId)

  if (!task) return notFound()

  return (
    <div className='flex size-full flex-col p-6'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/projects/${task.project}/tasks`}
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ArrowLeft className='size-4' />
          </Link>
          <h3>{task.name}</h3>
        </div>
        <RevalidateTagButton tag={`task-${domain}-${taskId}`} />
      </div>
    </div>
  )
}

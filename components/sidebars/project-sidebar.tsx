'use client'

import { buttonVariants } from '@/components/ui/button'
import ProjectDetails from '@/components/views/project/project-details'
import { cn } from '@/lib/utils'
import { ProjectWithRelations } from '@/queries/project'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  project: ProjectWithRelations
}

export default function ProjectSidebar({ project }: Props) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className='flex w-[22rem] min-w-[22rem] flex-col border-r'>
      <div className='flex items-center justify-between border-b p-4'>
        <Link
          href={`/dashboard/projects`}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <ArrowLeft className='size-4' />
        </Link>
        <div className='flex items-center gap-1'>
          <Link
            href={`/dashboard/projects/${project.id}`}
            className={cn(
              'rounded-md px-3 py-0.5 text-sm transition-all',
              !segment
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            Tasks
          </Link>
          <Link
            href={`/dashboard/projects/${project.id}/files`}
            className={cn(
              'rounded-md px-3 py-0.5 text-sm transition-all',
              segment === 'files'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            Files
          </Link>
        </div>
      </div>
      <ProjectDetails project={project} />
    </div>
  )
}

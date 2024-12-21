import TaskFileCanvasWrapper from '@/components/views/task/task-file-canvas-wrapper'
import { extractDomain } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
  searchParams: Promise<{ version: string | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = extractDomain(domainParam)
  const { version } = await searchParams

  return (
    <div className='flex size-full bg-muted/50'>
      <Suspense
        fallback={
          <div className='flex size-full items-center justify-center'>
            <Loader2 className='size-8 animate-spin' />
          </div>
        }
      >
        <TaskFileCanvasWrapper
          domain={domain}
          taskId={taskId}
          version={version}
        />
      </Suspense>
    </div>
  )
}

import { getDomain } from '@/lib/utils/get-domain'
import { getDomainUrl } from '@/lib/utils/get-domain-url'
import { Workspace } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  workspace: Workspace
}

export default function WorkspaceGridItem({ workspace }: Props) {
  const domain = getDomain(workspace.domain)
  const url = getDomainUrl(workspace.domain)

  return (
    <Link
      href={url}
      className='min-h-32 min-w-96 rounded-lg border p-4 transition-all hover:bg-muted'
    >
      <div className='flex justify-between'>
        <div className='space-y-1'>
          <h6>{workspace.name}</h6>
          <p className='text-sm text-muted-foreground'>{domain}</p>
        </div>
        <ChevronRight className='m-1 size-4' />
      </div>
    </Link>
  )
}

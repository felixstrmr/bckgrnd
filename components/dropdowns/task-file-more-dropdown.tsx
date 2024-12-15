'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowUpRight, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  projectId: string | null | undefined
}

export default function TaskFileMoreDropdown({ projectId }: Props) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {projectId && (
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/projects/${projectId}`)}
          >
            View Project
            <ArrowUpRight className='ml-auto text-muted-foreground' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

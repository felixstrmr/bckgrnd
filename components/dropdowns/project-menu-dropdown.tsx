'use client'

import { deleteProjectAction } from '@/actions/delete-project-action'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Project } from '@/types'
import { MoreVertical, Trash } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

type Props = {
  domain: string
  project: Project
}

export default function ProjectMenuDropdown({ domain, project }: Props) {
  const { execute, status } = useAction(deleteProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('Project deleted successfully')
    },
  })
  const loading = status === 'executing'

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'icon'}>
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className='text-destructive'>
              <Trash className='size-4' />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project and all of its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            disabled={loading}
            onClick={() => execute({ id: project.id, domain: domain })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

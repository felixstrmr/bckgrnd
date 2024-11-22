'use client'

import CreateTaskForm from '@/components/forms/create-task-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TaskPriority } from '@/types'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {
  domain: string
  projectId: string
  statusId: string
  workspaceId: string
  priorities: TaskPriority[]
}

export default function CreatTaskDialog({
  domain,
  projectId,
  statusId,
  workspaceId,
  priorities,
}: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='size-7 min-w-7 rounded-sm hover:bg-black/10'
          size='icon'
        >
          <Plus className='size-4 text-muted-foreground' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className='text-xs text-muted-foreground'>New Task</span>
          </DialogTitle>
        </DialogHeader>
        <CreateTaskForm
          domain={domain}
          projectId={projectId}
          statusId={statusId}
          workspaceId={workspaceId}
          priorities={priorities}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

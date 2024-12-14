import CreateTaskForm from '@/components/forms/create-task-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateTaskDialog } from '@/store/use-create-task-dialog'
import { Client, TaskPriority } from '@/types'

type Props = {
  projectId?: string
  workspaceId: string
  taskPriorities: TaskPriority[]
  clients: Client[] | null
}

export default function CreateTaskDialog({
  projectId,
  workspaceId,
  taskPriorities,
  clients,
}: Props) {
  const { open, setOpen, statusId } = useCreateTaskDialog()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-2xl p-0'>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <CreateTaskForm
          projectId={projectId}
          statusId={statusId ?? ''}
          workspaceId={workspaceId}
          setOpen={setOpen}
          taskPriorities={taskPriorities}
          clients={clients}
        />
      </DialogContent>
    </Dialog>
  )
}

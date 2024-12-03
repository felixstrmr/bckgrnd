import InviteClientUserForm from '@/components/forms/invite-client-user-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

type Props = {
  domain: string
  clientId: string
  workspaceId: string
  inviterName: string
  clientName: string
  workspaceName: string
}

export default function InviteClientUserDialog({
  domain,
  clientId,
  workspaceId,
  inviterName,
  clientName,
  workspaceName,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='size-4' />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
        </DialogHeader>
        <InviteClientUserForm
          domain={domain}
          clientId={clientId}
          workspaceId={workspaceId}
          inviterName={inviterName}
          clientName={clientName}
          workspaceName={workspaceName}
        />
      </DialogContent>
    </Dialog>
  )
}

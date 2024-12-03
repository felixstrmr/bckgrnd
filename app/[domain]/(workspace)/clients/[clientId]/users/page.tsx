import InviteClientUserDialog from '@/components/dialogs/invite-client-user-dialog'
import { columns } from '@/components/tables/client-users/columns'
import { DataTable } from '@/components/tables/client-users/data-table'
import {
  getClientUserInvitationsWithCache,
  getClientUsersWithCache,
  getClientWithCache,
  getUserWithCache,
  getWorkspaceWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string; clientId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, clientId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [clientUsers, clientUserInvitations, workspace, user, client] =
    await Promise.all([
      getClientUsersWithCache(supabase, domain, clientId),
      getClientUserInvitationsWithCache(supabase, domain, clientId),
      getWorkspaceWithCache(supabase, domain),
      getUserWithCache(supabase, domain),
      getClientWithCache(supabase, domain, clientId),
    ])

  const allClientUsers = [
    ...clientUsers.map((user) => ({
      email: user.user.email,
    })),
    ...clientUserInvitations.map((invitation) => ({
      email: invitation.email,
      status: invitation.status,
      expires_at: invitation.expires_at,
    })),
  ]

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <h3>Users</h3>
          <div className='rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>
            {clientUsers.length}
          </div>
        </div>
        <InviteClientUserDialog
          domain={domain}
          clientId={clientId}
          workspaceId={workspace.id}
          inviterName={user.display_name ?? user.email}
          clientName={client.name}
          workspaceName={workspace.name}
        />
      </div>
      <DataTable columns={columns} data={allClientUsers} />
    </div>
  )
}

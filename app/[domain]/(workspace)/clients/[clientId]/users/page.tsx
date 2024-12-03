import InviteClientUserDialog from '@/components/dialogs/invite-client-user-dialog'
import ClientUserTabs from '@/components/tabs/client-user-tabs'
import ClientUserView from '@/components/views/client-user/client-user-view'
import {
  getClientUserInvitationsWithCache,
  getClientUsersWithCache,
  getClientWithCache,
  getUserWithCache,
  getWorkspaceWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { User } from 'lucide-react'

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

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <h3>Users</h3>
          <p className='flex h-8 items-center gap-2 rounded-lg border border-dashed bg-background px-3 text-sm text-muted-foreground shadow-sm'>
            <User className='size-4' />
            {client.name}
          </p>
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
      <ClientUserTabs />
      <ClientUserView
        clientUsers={clientUsers}
        clientUserInvitations={clientUserInvitations}
      />
    </div>
  )
}

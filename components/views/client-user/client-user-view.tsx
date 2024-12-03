'use client'

import { columns as clientUserInvitationColumns } from '@/components/tables/client-user-invitations/columns'
import { DataTable as ClientUserInvitationDataTable } from '@/components/tables/client-user-invitations/data-table'
import { columns as clientUserColumns } from '@/components/tables/client-users/columns'
import { DataTable as ClientUserDataTable } from '@/components/tables/client-users/data-table'
import { ClientUser, ClientUserInvitation } from '@/types'
import { parseAsString } from 'nuqs'

import { useQueryState } from 'nuqs'

type Props = {
  clientUsers: ClientUser[]
  clientUserInvitations: ClientUserInvitation[]
}

export default function ClientUserView({
  clientUsers,
  clientUserInvitations,
}: Props) {
  const [currentTab] = useQueryState('tab', parseAsString.withDefault('users'))

  return (
    <>
      {currentTab === 'users' ? (
        <div className='space-y-4'>
          <h5>Active Users</h5>
          <ClientUserDataTable columns={clientUserColumns} data={clientUsers} />
        </div>
      ) : (
        <div className='space-y-4'>
          <h5>Invited Users</h5>
          <ClientUserInvitationDataTable
            columns={clientUserInvitationColumns}
            data={clientUserInvitations}
          />
        </div>
      )}
    </>
  )
}

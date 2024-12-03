'use client'

import { ColumnDef } from '@tanstack/react-table'

type ClientUser = {
  email: string
  status?: string
  expires_at?: string
}

export const columns: ColumnDef<ClientUser>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'expires_at',
    header: 'Expires At',
  },
]

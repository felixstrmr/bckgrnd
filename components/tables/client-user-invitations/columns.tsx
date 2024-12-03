'use client'

import { ClientUserInvitation } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

export const columns: ColumnDef<ClientUserInvitation>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <span className='capitalize'>{row.original.status}</span>
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Invited',
    cell: ({ row }) => {
      return <span>{formatDate(row.original.created_at, 'PPp')}</span>
    },
  },
  {
    accessorKey: 'expires_at',
    header: 'Expires',
    cell: ({ row }) => {
      return <span>{formatDate(row.original.expires_at, 'PPp')}</span>
    },
  },
]

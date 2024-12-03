'use client'

import { ClientUser } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<ClientUser>[] = [
  {
    accessorKey: 'user.email',
    header: 'Email',
  },
]

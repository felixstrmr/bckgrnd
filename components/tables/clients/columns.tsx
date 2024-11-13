'use client'

import { Client } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
]

'use client'

import { ClientUserWithRelations } from '@/types/custom'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<ClientUserWithRelations>[] = [
  {
    accessorKey: 'user.email',
    header: 'Email',
  },
]

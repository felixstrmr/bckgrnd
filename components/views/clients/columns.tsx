'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Client } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
export const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const client = row.original

      const initials = client.name
        .split(' ')
        .map((n) => n[0])
        .join('')

      return (
        <div className='flex items-center gap-2'>
          <Avatar className='size-7'>
            <AvatarFallback className='size-7 text-xs'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <span>{client.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const client = row.original
      return <span>{format(client.created_at, 'PP, p')}</span>
    },
  },
]

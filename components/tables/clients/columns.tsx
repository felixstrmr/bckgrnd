'use client'

import DeleteClientDialog from '@/components/dialogs/delete-client-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClientWithRelations } from '@/types/custom'
import { ColumnDef } from '@tanstack/react-table'
import Avvvatars from 'avvvatars-react'
import { MoreHorizontal, Trash } from 'lucide-react'

export const columns: ColumnDef<ClientWithRelations>[] = [
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className='flex items-center gap-2'>
          <div
            className='size-2 rounded-full'
            style={{ backgroundColor: status.color }}
          />
          <p>{status.name}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const client = row.original

      return (
        <div className='flex items-center gap-2'>
          <Avvvatars value={client.name} size={32} />
          <p className='font-medium'>{client.name}</p>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className='text-destructive hover:text-destructive'>
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteClientDialog client={client} />
        </Dialog>
      )
    },
  },
]

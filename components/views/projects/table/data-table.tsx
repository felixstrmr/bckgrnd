'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='h-full border-t'>
      <Table>
        <TableHeader className='bg-muted'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='px-6'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  const isClickable =
                    cell.column.id !== 'select' && cell.column.id !== 'actions'
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'border-b px-6',
                        isClickable &&
                          'cursor-pointer transition-colors hover:bg-muted/50',
                      )}
                      onClick={() => {
                        if (isClickable) {
                          const rowData = row.original as { id: string }
                          router.push(`/dashboard/projects/${rowData.id}`)
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className='hover:bg-transparent'>
              <TableCell colSpan={columns.length} className='h-64 text-center'>
                <div className='flex size-full flex-col items-center justify-center'>
                  <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
                    <UserPlus className='size-8 text-muted-foreground' />
                  </div>
                  <div className='mt-2 text-center'>
                    <h5>No clients found.</h5>
                    <p className='text-muted-foreground'>
                      Create your first client to get started.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

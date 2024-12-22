'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

type TaskFileVersion = {
  id: string
  version: number
}

type Props = {
  taskFileVersions: TaskFileVersion[] | null
}

export default function TaskFileVersionSelect({ taskFileVersions }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)

  const lastVersion = taskFileVersions?.[0]

  const [currentVersion, setCurrentVersion] = useQueryState(
    'version',
    parseAsString
      .withDefault(lastVersion?.id ?? '')
      .withOptions({ shallow: false }),
  )

  if (!taskFileVersions?.length) return null

  if (taskFileVersions.length === 1) {
    return (
      <div className='flex h-7 items-center justify-center rounded-md bg-muted px-3 text-sm text-muted-foreground'>
        V1
      </div>
    )
  }

  return (
    <Select
      value={currentVersion}
      onValueChange={setCurrentVersion}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger
        className={cn(
          'flex h-7 rounded-md border-none px-3 text-sm text-muted-foreground shadow-none hover:bg-muted',
          isOpen && 'bg-muted',
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className='w-16 min-w-fit'
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {taskFileVersions.map((version) => (
          <SelectItem key={version.id} value={version.id}>
            V{version.version}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

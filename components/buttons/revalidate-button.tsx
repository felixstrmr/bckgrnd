'use client'

import { revalidateTagAction } from '@/actions/revalidate-tag-action'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useTransition } from 'react'

type Props = {
  tag: string
}

export default function RevalidateTagButton({ tag }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    startTransition(async () => {
      await revalidateTagAction({ tag })
    })
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={handleRevalidate}
      disabled={isPending}
    >
      <RefreshCcw className={isPending ? 'animate-spin' : ''} />
    </Button>
  )
}

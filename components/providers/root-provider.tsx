import { Toaster } from '@/components/ui/sonner'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <NuqsAdapter>
      {children}
      <Toaster />
    </NuqsAdapter>
  )
}

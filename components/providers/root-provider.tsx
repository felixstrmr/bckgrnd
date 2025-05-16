import { Toaster } from '@/components/ui/sonner'

type Props = {
  children: React.ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

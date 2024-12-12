import { Toaster } from '@/components/ui/sonner'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next/types'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bckgrnd › All-in-one platform for managing your design projects.',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className='font-medium antialiased'>
        <NuqsAdapter>
          <main className='h-screen w-screen'>{children}</main>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  )
}

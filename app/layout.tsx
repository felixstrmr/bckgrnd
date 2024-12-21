import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/lib/env'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next/types'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bckgrnd › Deliver work faster.',
  description:
    'Bckgrnd is an all-in-one platform for managing your design projects.',
  twitter: {
    title: 'Bckgrnd › Deliver work faster.',
    description:
      'Bckgrnd is an all-in-one platform for managing your design projects.',
    images: [
      {
        url: 'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/opengraph-image.webp',
        width: 800,
        height: 420,
      },
      {
        url: 'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/opengraph-image.webp',
        width: 1904,
        height: 1000,
      },
    ],
  },
  openGraph: {
    title: 'Bckgrnd › Deliver work faster.',
    description:
      'Bckgrnd is an all-in-one platform for managing your design projects.',
    url: `${env.NEXT_PUBLIC_PROTOCOL}://${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    siteName: 'Bckgrnd',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/opengraph-image.webp',
        width: 800,
        height: 420,
      },
      {
        url: 'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/opengraph-image.webp',
        width: 1904,
        height: 1000,
      },
    ],
  },
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
      <body>
        <NuqsAdapter>
          <TooltipProvider>
            <main className='h-screen w-screen'>{children}</main>
            <Toaster />
          </TooltipProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}

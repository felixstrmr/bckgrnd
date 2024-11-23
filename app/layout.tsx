import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next/types'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { env } from '@/lib/env'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bckgrnd | Streamline your design workflow.',
  description:
    'Create, collaborate, and ship your designs faster with our powerful design-workflow tool.',
  twitter: {
    title: 'Bckgrnd | Streamline your design workflow.',
    description:
      'Create, collaborate, and ship your designs faster with our powerful design-workflow tool.',
    images: [
      {
        url: 'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/opengraph-image.jpg',
        width: 800,
        height: 420,
      },
      {
        url: 'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/opengraph-image.jpg',
        width: 1800,
        height: 945,
      },
    ],
  },
  openGraph: {
    title: 'Bckgrnd | Streamline your design workflow.',
    description:
      'Create, collaborate, and ship your designs faster with our powerful design-workflow tool.',
    url: `${env.NEXT_PUBLIC_PROTOCOL}://${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    siteName: 'Bckgrnd',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/opengraph-image.jpg',
        width: 800,
        height: 420,
      },
      {
        url: 'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/opengraph-image.jpg',
        width: 1800,
        height: 945,
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
      <body className='antialiased'>
        <ThemeProvider attribute={'class'} forcedTheme='light'>
          <NuqsAdapter>
            <main className='w-sreen h-screen'>{children}</main>
          </NuqsAdapter>
        </ThemeProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

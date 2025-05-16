import RootProvider from '@/components/providers/root-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next/types'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bckgrnd • Deliver design work faster.',
  description: 'Bckgrnd is a platform for delivering design work faster.',
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
        <ThemeProvider attribute='class' forcedTheme='light'>
          <RootProvider>
            <main className='h-screen w-screen'>{children}</main>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

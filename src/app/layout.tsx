import { ReactNode } from 'react'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import QueryProvider from './Providers/QueryProvider'
import { ThemeProviderWrapper } from './Providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <QueryProvider>
        <body
          className={`${inter.className} selection:bg-emerald-500 selection:text-neutral-950`}
        ><ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        </body>
      </QueryProvider>
    </html>
  )
}

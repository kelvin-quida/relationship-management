'use client'

import { ThemeProvider } from 'next-themes'

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="light" themes={['light', 'dark']}>
      {children}
    </ThemeProvider>
  )
}

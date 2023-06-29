'use client'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import Topbar from '@/components/Topbar'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { token } = parseCookies()
  const router = useRouter()

  if (token !== process.env.NEXT_PUBLIC_TOKEN) {
    return router.push('/')
  }

  return (
    <>
      <Topbar />
      {children}
    </>
  )
}

'use client'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { GlobalProvider } from '@/context/MainContext'
import Sidebar from '@/components/ui/Sidebar'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { token } = parseCookies()
  const router = useRouter()

  if (token !== process.env.NEXT_PUBLIC_TOKEN) {
    return router.push('/')
  }

  return (
    <>
      <GlobalProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
            {children}
          </div>
        </div>
      </GlobalProvider>
    </>
  )
}

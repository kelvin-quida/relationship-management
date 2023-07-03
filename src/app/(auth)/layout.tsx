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
        <div className='flex'>
          <Sidebar />
          <div className="flex flex-col bg-neutral-900 w-full min-h-screen">
            {children}
          </div>
        </div>
      </GlobalProvider>
    </>
  )
}

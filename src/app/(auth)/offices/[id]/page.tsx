import ClientOffice from '@/components/clients/ClientOffice'
import BrowserOffice from '@/components/office/BrowserOffice'
import Box from '@/components/ui/Box'
import { AlertTriangleIcon } from 'lucide-react'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function OfficeID({ params }: Props) {
  return (
    <div className="mx-auto flex h-screen w-full flex-col gap-4 p-6">
      <BrowserOffice id={params.id} />
      <div className="flex h-full gap-4">
        <ClientOffice id={params.id} />
        <Box className="flex h-full max-w-sm items-center justify-center text-neutral-600">
          <AlertTriangleIcon className="mr-2 h-4 w-4" />
          Em Desenvolvimento
        </Box>
      </div>
    </div>
  )
}

import ClientOffice from '@/components/clients/ClientOffice'
import BrowserOffice from '@/components/office/BrowserOffice'
import Box from '@/components/ui/Box'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function OfficeID({ params }: Props) {
  console.log(params.id)
  return (
    <div className="mx-auto flex h-screen w-full flex-col gap-4 p-6">
      <BrowserOffice id={params.id} />
      <div className="flex h-full gap-4">
        <ClientOffice id={params.id} />
        <Box className="h-full max-w-sm">Teste</Box>
      </div>
    </div>
  )
}

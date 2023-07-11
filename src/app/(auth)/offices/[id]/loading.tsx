import Box from '@/components/ui/Box'
import React from 'react'

export default function OfficeIdLoading() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col gap-4 p-6">
      <Box className="flex h-full w-full animate-pulse flex-col gap-4" />
    </div>
  )
}

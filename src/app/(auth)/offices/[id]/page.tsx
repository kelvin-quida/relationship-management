import BrowserOffice from '@/components/office/BrowserOffice'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function OfficeID({params}: Props) {
  console.log(params.id)
  return (
    <div className='mx-auto h-screen w-full p-6' >
      <BrowserOffice id={params.id} />
    </div>
  )
}

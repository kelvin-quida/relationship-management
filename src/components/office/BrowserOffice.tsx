'use client'
import { getOffice } from '@/queries/getOffices'
import Box from '../ui/Box'
import { useQuery } from '@tanstack/react-query'

type Props = {
  id: string
}

export default function BrowserOffice({ id }: Props) {
  const { data: offices } = useQuery({
    queryKey: ['offices', id],
    queryFn: ({ queryKey }) => getOffice(queryKey[1])
  })

  console.log(offices)

  return (
    <>
      <Box className="relative w-full p-10 h-1/4 overflow-hidden flex items-center justify-stretch">
        <div className='w-full max-w-lg flex flex-col items-start justify-center gap-3'>
          <h1 className='font-bold text-6xl line-clamp-1' title="Vercel Enterprise">Vercel Enterprise</h1>
          <p className='font-normal text-sm text-neutral-400 line-clamp-3'>
            We are a full-service digital agency that builds immesive user We are a full-service digital agency that builds immesive user We are a full-service digital agency that builds immesive user
          </p>
        </div>
        <div>
          <p></p>
        </div>
      </Box>
    </>
  )
}

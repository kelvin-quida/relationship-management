'use client'
import { getOffice } from '@/queries/getOffices'
import Box from '../ui/Box'
import { useQuery } from '@tanstack/react-query'

type Props = {
  id: string
}

export default function BrowserOffice({ id }: Props) {
  const { data } = useQuery({
    queryKey: ['offices', id],
    queryFn: ({ queryKey }) => getOffice(queryKey[1]),
  })

  console.log(data)

  return (
    <>
      <Box className="relative flex h-[220px] min-h-[220px] w-full items-center justify-stretch overflow-hidden p-10">
        <div className="flex w-full max-w-lg flex-col items-start justify-center gap-3">
          <h1
            className="line-clamp-1 text-6xl font-bold"
            title="Vercel Enterprise"
          >
            {data?.name}
          </h1>
          <p className="line-clamp-3 text-sm font-normal text-neutral-400">
            We are a full-service digital agency that builds immesive user We
            are a full-service digital agency that builds immesive user We are a
            full-service digital agency that builds immesive user
          </p>
        </div>
        <div className="flex flex-col">
          <p>Website: vercel.com.br</p>
          <p>Email: vercel@gmail.com</p>
          <p>Phone: (11) 99999-9999</p>
        </div>
      </Box>
    </>
  )
}

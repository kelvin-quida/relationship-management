'use client'
import { getOffice } from '@/queries/getOffices'
import Box from '../ui/Box'
import { useQuery } from '@tanstack/react-query'
import {
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import Anchor from '../ui/Anchor'

type Props = {
  id: string
}

export default function BrowserOffice({ id }: Props) {
  const { data: office } = useQuery({
    queryKey: ['offices', id],
    queryFn: ({ queryKey }) => getOffice(queryKey[1]),
  })

  console.log(office?.website)

  return (
    <>
      <Box className="relative flex h-[220px] min-h-[220px] w-full items-center justify-between overflow-hidden p-10">
        <div className="flex w-full max-w-lg flex-col items-start justify-center gap-5">
          <h1
            className="line-clamp-1 text-6xl font-bold"
            title="Vercel Enterprise"
          >
            {office?.name}
          </h1>

          <div className="flex items-center justify-start gap-3">
            <Anchor
              href={`https://${office?.website}`}
              target="_blank"
              color="neutral"
              className="flex items-center justify-start gap-2 text-neutral-400"
            >
              <GlobeAltIcon className="h-5 w-5" />
              <p>{office?.website}</p>
            </Anchor>
            <Anchor
              href={`mailto:${office?.email}`}
              target="_blank"
              rel="noreferrer"
              color="neutral"
              className="flex items-center justify-start gap-2 text-neutral-400"
            >
              <EnvelopeIcon className="h-5 w-5" />
              <p>{office?.email}</p>
            </Anchor>
            <Anchor
              href={`https://www.google.com.br/maps/place/${office?.location}`}
              color="neutral"
              rel="noreferrer"
              target="_blank"
              className="flex items-center justify-start gap-2 text-neutral-400"
            >
              <MapPinIcon className="h-5 w-5" />
              <p>{office?.location}</p>
            </Anchor>
          </div>
        </div>
        <div className="h-full w-1/3 rounded-lg border border-neutral-800 bg-background p-4">
          <p
            title={office?.description}
            className="line-clamp-5 text-sm font-normal text-neutral-400"
          >
            {office?.description}
          </p>
        </div>
      </Box>
    </>
  )
}

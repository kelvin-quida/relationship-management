'use client'
import { getOffice } from '@/queries/getOffices'
import Box from '../ui/Box'
import { useQuery } from '@tanstack/react-query'
import {
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Anchor from '../ui/Anchor'

type Props = {
  id: string
}

export default function BrowserOffice({ id }: Props) {
  const { data: office } = useQuery({
    queryKey: ['offices', id],
    queryFn: ({ queryKey }) => getOffice(queryKey[1]),
  })

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
            {office?.website && (
              <Anchor
                href={`https://${office?.website}`}
                target="_blank"
                color="neutral"
                className="flex items-center justify-start gap-2 dark:text-neutral-400"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <p>{office?.website}</p>
              </Anchor>
            )}
            <Anchor
              href={`mailto:${office?.email}`}
              target="_blank"
              rel="noreferrer"
              color="neutral"
              className="flex items-center justify-start gap-2 dark:text-neutral-400"
            >
              <EnvelopeIcon className="h-5 w-5" />
              <p>{office?.email}</p>
            </Anchor>
            <Anchor
              href={`tel:${office?.phone}`}
              target="_blank"
              rel="noreferrer"
              color="neutral"
              className="flex items-center justify-start gap-2 dark:text-neutral-400"
            >
              <PhoneIcon className="h-5 w-5" />
              <p>{office?.phone}</p>
            </Anchor>
            <Anchor
              href={`https://www.google.com.br/maps/place/${office?.location}`}
              color="neutral"
              rel="noreferrer"
              target="_blank"
              className="flex items-center justify-start gap-2 dark:text-neutral-400"
            >
              <MapPinIcon className="h-5 w-5" />
              <p>{office?.location}</p>
            </Anchor>
          </div>
        </div>
        <div className="h-full w-1/3 rounded-lg border dark:border-neutral-800 dark:bg-background p-4">
          <p
            title={office?.description ?? ''}
            className="line-clamp-5 text-sm font-normal dark:text-neutral-400"
          >
            {office?.description}
          </p>
        </div>
      </Box>
    </>
  )
}

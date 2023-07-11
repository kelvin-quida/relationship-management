import ClientGrid from '@/components/clients/ClientGrid'
import Box from '@/components/ui/Box'
import Calendar from '@/components/ui/Calendar'
import SliderModal from '@/components/ui/SliderModal'
import getQueryClient from '@/lib/queryClient'
import { getClients } from '@/queries/getClients'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import { AlertTriangleIcon } from 'lucide-react'

export default async function Client() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['clients'], getClients)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="mx-auto h-screen w-full p-6">
      <Hydrate state={dehydratedState}>
        <div className="flex h-full w-full items-start justify-center gap-4 ">
          <ClientGrid />
          <div className="hidden h-full w-1/3 gap-4 xl:flex xl:flex-col">
            <Box className="h-[600px] w-full">
              <Calendar initialDateString="2023-07-05" />
            </Box>
            <Box className=" flex h-full w-full items-center justify-center text-neutral-600">
              <AlertTriangleIcon className="mr-2 h-4 w-4" />
              Em Desenvolvimento
            </Box>
          </div>
        </div>
        <SliderModal />
      </Hydrate>
    </main>
  )
}

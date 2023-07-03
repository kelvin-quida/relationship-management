import ClientGrid from '@/components/clients/ClientGrid'
import SliderModal from '@/components/ui/SliderModal'
import getQueryClient from '@/lib/queryClient'
import { getClients } from '@/queries/getClients'
import { Hydrate, dehydrate } from '@tanstack/react-query'

export default async function Client() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['clients'], getClients)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="mx-auto w-full max-w-7xl p-6">
      <Hydrate state={dehydratedState}>
        <ClientGrid />
        <SliderModal />
      </Hydrate>
    </main>
  )
}
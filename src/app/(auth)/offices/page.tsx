import OfficeGrid from '@/components/offices/OfficeGrid'
import SliderModal from '@/components/ui/SliderModal'
import getQueryClient from '@/lib/queryClient'
import { getOffices } from '@/queries/getOffices'
import { Hydrate, dehydrate } from '@tanstack/react-query'

export default async function Client() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['offices'], getOffices)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="mx-auto w-full max-w-7xl p-6">
      <Hydrate state={dehydratedState}>
        <OfficeGrid />
        <SliderModal />
      </Hydrate>
    </main>
  )
}

import CallGrid from '@/components/calls/CallGrid'

export default async function Call() {
  return (
    <main className="mx-auto h-screen w-full p-6">
      <div className="flex h-full w-full items-start justify-center gap-4 overflow-hidden">
        <CallGrid />
      </div>
    </main>
  )
}

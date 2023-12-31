import OfficeGrid from '@/components/offices/OfficeGrid'
export default async function Office() {
  return (
    <main className="mx-auto h-screen w-full p-6">
      <div className="flex h-full w-full items-start justify-center gap-4 overflow-hidden">
        <OfficeGrid />
      </div>
    </main>
  )
}

import ClientGrid from '@/components/ClientGrid'
import { cookies } from 'next/headers'

export default async function Client() {
  const token = cookies().get('token')

  const data = await fetch('http://localhost:3000/api/client/findAll', {
    method: 'GET',
    headers: {
      Authorization: `${token?.value}`,
    },
    cache: 'no-cache',
  })
  const client = await data.json()
  console.log(token)
  console.log(client)

  return (
    <main className="mx-auto w-full max-w-7xl p-6">
      <ClientGrid dataList={client} categorTitle="Clientes" />
    </main>
  )
}

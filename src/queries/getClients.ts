'use server'
import { cookies } from 'next/headers'
import { TClientWithOffice } from '@/types'
import { api } from '@/lib/api'

export async function getClients() {
  const token = cookies().get('token')

  const { data } = await api.get('/client/findAll', {
    headers: {
      Authorization: `${token?.value}`,
    },
  })

  return data as TClientWithOffice[]
}

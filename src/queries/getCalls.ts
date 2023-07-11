'use server'
import { cookies } from 'next/headers'
import { THistoryCall } from '@/types'
import { api } from '@/lib/api'

export async function getCalls() {
  const token = cookies().get('token')

  const { data } = await api.get('/historycall/findAll', {
    headers: {
      Authorization: `${token?.value}`,
    },
  })

  return data as THistoryCall[]
}

'use server'
import { TOfficeWithClient } from '@/types'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'

export async function getOffices() {
  const token = cookies().get('token')

  const { data } = await api.get('/office/findAll', {
    headers: {
      Authorization: `${token?.value}`,
    },
  })

  return data as TOfficeWithClient[]
}

export async function getOffice(id: string) {
  const token = cookies().get('token')

  const { data } = await api.get('/office/find', {
    headers: {
      Authorization: `${token?.value}`,
    },
    params: {
      id,
    },
  })

  return data as TOfficeWithClient[]
}

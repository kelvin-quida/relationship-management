'use server'
import { TClient } from '@/types'
import { cookies } from 'next/headers'
import axios from 'axios'

export async function getClients() {
  const token = cookies().get('token')

  const { data } = await axios.get('http://localhost:3000/api/client/findAll', {
    headers: {
      Authorization: `${token?.value}`,
    },
  })

  return data as TClient[]
}

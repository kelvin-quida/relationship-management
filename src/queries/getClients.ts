'use server'
import { cookies } from 'next/headers'
import axios from 'axios'
import { TClientWithOffice } from '@/types'

export async function getClients() {
  const token = cookies().get('token')

  const { data } = await axios.get('http://localhost:3000/api/client/findAll', {
    headers: {
      Authorization: `${token?.value}`,
    },
  })

  return data as TClientWithOffice[]
}

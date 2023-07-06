'use server'
import { TOfficeWithClient } from '@/types'
import { cookies } from 'next/headers'
import axios from 'axios'

export async function getOffices() {
  const token = cookies().get('token')

  const { data } = await axios.get('http://localhost:3000/api/office/findAll', {
    headers: {
      Authorization: `${token?.value}`,
    },
  })

  return data as TOfficeWithClient[]
}

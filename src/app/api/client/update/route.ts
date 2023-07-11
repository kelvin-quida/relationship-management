import { TClientWithOffice } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  const { name, address, email, phone, role, roleAge, officeId, description } =
    (await req.json()) as TClientWithOffice

  const id = req.nextUrl.searchParams.get('id')

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!id) {
    return NextResponse.json('Tem id nao mano')
  }

  const findClient = await prisma.client.findUnique({
    where: {
      id,
    },
  })

  if (!findClient) {
    return NextResponse.json('Client não exists')
  }

  const client = await prisma.client.update({
    where: {
      id,
    },
    data: {
      email,
      name,
      role,
      roleAge,
      description,
      phone,
      address,
      officeId,
    },
  })

  return NextResponse.json(client)
}

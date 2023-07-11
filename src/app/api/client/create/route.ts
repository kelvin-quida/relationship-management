import { TClientWithOffice } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, address, email, phone, role, roleAge, officeId, description } =
    (await req.json()) as TClientWithOffice

  try {
    const Auth = AuthRoute(req)

    if (!Auth) {
      return NextResponse.json('Token Incorreto')
    }

    const findClient = await prisma.client.findUnique({
      where: {
        email,
      },
    })

    if (findClient) {
      return NextResponse.json(
        { error: 'Cliente já cadastrado' },
        { status: 400 },
      )
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        address,
        description,
        role,
        roleAge,
        officeId,
      },
    })

    return NextResponse.json(client)
  } catch (err) {
    return NextResponse.json(err)
  }
}

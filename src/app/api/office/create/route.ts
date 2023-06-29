import { TOffice } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, name, description, location, phone, website } =
    (await req.json()) as TOffice

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  const findOffice = await prisma.office.findUnique({
    where: {
      email,
    },
  })

  if (findOffice) {
    return NextResponse.json('Client already exists')
  }

  const office = await prisma.office.create({
    data: {
      name,
      email,
      description,
      location,
      phone,
      website,
    },
  })

  return NextResponse.json(office)
}

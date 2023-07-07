import { TGift } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  const { name, description, officeId, sendDate } = (await req.json()) as TGift

  const id = req.nextUrl.searchParams.get('id')

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!id) {
    return NextResponse.json('Tem id nao mano')
  }

  const findGift = await prisma.gift.findUnique({
    where: {
      id,
    },
  })

  if (!findGift) {
    return NextResponse.json('Brinde não exists')
  }

  const gift = await prisma.gift.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      officeId,
      sendDate,
    },
  })

  return NextResponse.json(gift)
}

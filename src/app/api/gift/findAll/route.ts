import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const findAllGifts = await prisma.gift.findMany({
    include: {
      office: true,
    },
  })
  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!findAllGifts) {
    return NextResponse.json('Não existe brindes cadastrados')
  }

  return NextResponse.json(findAllGifts)
}

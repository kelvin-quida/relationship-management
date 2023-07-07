import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!id) {
    return NextResponse.json('Tem id nao mano')
  }

  try {
    const findGift = await prisma.gift.findUnique({
      where: {
        id,
      },
    })
    return NextResponse.json(findGift)
  } catch (error) {
    return NextResponse.json({ message: error })
  }
}

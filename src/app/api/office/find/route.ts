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

  const findOffice = await prisma.office.findUnique({
    where: {
      id,
    },
  })

  return NextResponse.json(findOffice)
}

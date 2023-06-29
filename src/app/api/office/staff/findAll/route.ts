import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const officeId = req.nextUrl.searchParams.get('id')

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!officeId) {
    return NextResponse.json('Nao mandou id aqui nao')
  }

  const findOffice = await prisma.office.findUnique({
    where: {
      id: officeId,
    },
  })

  if (!findOffice) {
    return NextResponse.json('Não existe office')
  }

  const findStaff = await prisma.client.findMany({
    where: {
      officeId,
    },
  })

  return NextResponse.json(findStaff)
}

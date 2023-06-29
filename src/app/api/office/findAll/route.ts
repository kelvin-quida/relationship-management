import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const findAllOffice = await prisma.office.findMany()

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!findAllOffice) {
    return NextResponse.json('Não existe clientes cadastrados')
  }

  return NextResponse.json(findAllOffice)
}

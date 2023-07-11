import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const findAllHistoryCalls = await prisma.historyCall.findMany()

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!findAllHistoryCalls) {
    return NextResponse.json('Não existe chamadas cadastradas')
  }

  return NextResponse.json(findAllHistoryCalls)
}

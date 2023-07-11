import { THistoryCall } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  const { name, date, description, office, phone } =
    (await req.json()) as THistoryCall

  const id = req.nextUrl.searchParams.get('id')

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!id) {
    return NextResponse.json('Tem id nao mano')
  }

  const historyCall = await prisma.historyCall.findUnique({
    where: {
      id,
    },
  })

  if (!historyCall) {
    return NextResponse.json('Client não exists')
  }

  const historyCallPatched = await prisma.historyCall.update({
    where: {
      id,
    },
    data: {
      name,
      date,
      description,
      office,
      phone,
    },
  })

  return NextResponse.json(historyCallPatched)
}

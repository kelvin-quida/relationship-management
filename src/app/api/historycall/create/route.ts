import { THistoryCall } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, date, description, office, phone } =
    (await req.json()) as THistoryCall

  try {
    const Auth = AuthRoute(req)

    if (!Auth) {
      return NextResponse.json('Token Incorreto')
    }

    const historyCall = await prisma.historyCall.create({
      data: {
        name,
        office,
        description,
        phone,
        date,
      },
    })

    return NextResponse.json(historyCall)
  } catch (err) {
    return NextResponse.json(err)
  }
}

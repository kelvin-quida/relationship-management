import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!id) {
    return NextResponse.json('Tem id nao mano')
  }

  const historyCall = await prisma.historyCall.delete({
    where: {
      id,
    },
  })

  if (!historyCall) {
    return NextResponse.json('Chamada nao existe')
  }

  return NextResponse.json('Chamada deletada com sucesso!')
}

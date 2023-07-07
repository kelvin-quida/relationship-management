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

  const findDelete = await prisma.gift.delete({
    where: {
      id,
    },
  })

  if (!findDelete) {
    return NextResponse.json('Tem id aqui nao mano')
  }

  return NextResponse.json('Id deletado com sucesso!')
}

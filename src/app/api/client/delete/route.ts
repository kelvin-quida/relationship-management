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

  const findClient = await prisma.client.delete({
    where: {
      id,
    },
  })

  if (!findClient) {
    return NextResponse.json('Tem cliente aqui nao mano')
  }

  return NextResponse.json('Cliente deletado com sucesso!')
}

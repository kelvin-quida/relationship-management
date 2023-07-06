import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const findAllClients = await prisma.client.findMany({
    include: {
      office: true
    }
  })

  console.log(findAllClients)
  const Auth = AuthRoute(req)

  if (!Auth) {
    return NextResponse.json('Token Incorreto')
  }

  if (!findAllClients) {
    return NextResponse.json('Não existe clientes cadastrados')
  }

  return NextResponse.json(findAllClients)
}

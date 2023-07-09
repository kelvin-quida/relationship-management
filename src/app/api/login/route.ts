import { TUser } from '@/types'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as TUser

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!findUser) {
    return false
  }

  const comparePassword = findUser.password === password

  if (!comparePassword) {
    return false
  }

  return NextResponse.json('Foi maneiro')
}

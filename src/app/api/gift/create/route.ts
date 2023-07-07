import { TGift } from '@/types'
import { AuthRoute } from '@/hook/authRoute'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { name, description, sendDate, officeId } =
        (await req.json()) as TGift

    try {
        const Auth = AuthRoute(req)

        if (!Auth) {
            return NextResponse.json('Token Incorreto')
        }

        const findGift = await prisma.gift.findFirst({
            where: {
                name,
            },
        })

        if (findGift) {
            return NextResponse.json('Gift already exists')
        }

        const gift = await prisma.gift.create({
            data: {
                name,
                description,
                sendDate,
                officeId
            },
        })

        return NextResponse.json(gift)
    } catch (err) {
        return NextResponse.json(err)
    }
}

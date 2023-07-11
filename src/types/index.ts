import { Prisma } from '@prisma/client'

export type TClientWithOffice = Prisma.ClientGetPayload<{
  include: {
    office: true
  }
}>

export type TOfficeWithClient = Prisma.OfficeGetPayload<{
  include: {
    historyGift: true
    client: true
  }
}>

export type TGift = Prisma.GiftGetPayload<{
  include: {
    office: true
  }
}>

export type THistoryCall = Prisma.His

export type TUser = {
  id: string
  name: string
  email: string
  password: string
  admin: boolean
}

import { Prisma } from '@prisma/client'

export type TClientWithOffice = Prisma.ClientGetPayload<{
  include: {
    office: true
  }
}>

export type TOfficeWithClient = Prisma.OfficeGetPayload<{
  include: {
    client: true
  }
}>

export type TUser = {
  id: string
  name: string
  email: string
  password: string
  admin: boolean
}

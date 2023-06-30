export type TClient = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  role?: string
  roleAge?: number
  office?: string
  officeId?: string
}

export type TOffice = {
  id: string
  name: string
  email: string
  description?: string
  location?: string
  phone?: string
  website?: string
}

export type TUser = {
  id: string
  name: string
  email: string
  password: string
  admin: boolean
}

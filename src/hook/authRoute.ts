import { NextRequest } from 'next/server'

export function AuthRoute(req: NextRequest) {
  const token = req.headers.get('authorization')

  if (token !== process.env.NEXT_PUBLIC_TOKEN) {
    return false
  }

  return token
}

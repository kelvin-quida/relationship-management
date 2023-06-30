'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import axios from 'axios'

const FormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof FormSchema>

export default function FormLogin() {
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  async function FormSubmit(data: LoginFormData) {
    const loginUser = await axios.post('http://localhost:3000/api/login', {
      email: data.email,
      password: data.password,
    })

    if (loginUser) {
      setCookie(null, 'token', `${process.env.NEXT_PUBLIC_TOKEN}`, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* <div>
        <h1 className="text-center text-4xl  font-bold">Login</h1>
      </div> */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(FormSubmit)}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register('email')}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-orange-600 hover:text-orange-500"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register('password')}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

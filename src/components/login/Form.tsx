'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { api } from '@/lib/api'

const FormSchema = z.object({
  email: z.string().email({ message: 'Email invalido!' }),
  password: z.string().min(3, { message: 'Deve ter pelo menos 5 caracteres!' }),
})

type LoginFormData = z.infer<typeof FormSchema>

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  async function FormSubmit(data: LoginFormData) {
    try {
      const loginUser = await api.post('/login', {
        email: data.email,
        password: data.password,
      })

      if (loginUser) {
        setCookie(null, 'token', `${process.env.NEXT_PUBLIC_TOKEN}`, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        return router.push('/clients')
      }
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }

  return (
    <>
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
                className="block text-sm font-medium leading-6 text-white"
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
                  className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
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
                  className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
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
    </>
  )
}

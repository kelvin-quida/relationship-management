'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { api } from '@/lib/api'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const FormSchema = z.object({
  email: z.string().email({ message: 'Email invalido!' }).min(10, {
    message: 'Email deve ter pelo menos 10 caracteres!',
  }),
  password: z.string().min(3, { message: 'Deve ter pelo menos 3 caracteres!' }),
})

type LoginFormData = z.infer<typeof FormSchema>

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()
  const { theme, setTheme } = useTheme()

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
      setError('email', {
        type: 'manual',
        message: 'Email ou senha incorreto!',
      })
    }
  }

  return (
    <>
      <div className="flex h-max w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                className="block text-sm font-medium leading-6 dark:text-neutral-400"
              >
                Email
              </label>
              <div className="mt-2">
                <Input
                  color="primary"
                  id="email"
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  required
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 dark:text-neutral-400"
              >
                Senha
              </label>
              <div className="mt-2">
                <Input
                  color="primary"
                  id="password"
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  required
                  error={errors.password?.message}
                />
              </div>
            </div>

            <div>
              <Button
                color="primary"
                disabled={isSubmitting}
                className="w-full disabled:opacity-25"
                type="submit"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>
          <Button color='neutral' className='h-10 w-10 flex items-center justify-center p-1 fixed bottom-0 left-0 m-10' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'light' ? <SunIcon className='w-5 h-5'/> : <MoonIcon className='w-5 h-5' />}
          </Button>
        </div>
      </div>
    </>
  )
}

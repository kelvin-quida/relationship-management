'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCookies } from 'nookies'
import { api } from '@/lib/api'
import { Modal } from '@/components/ui/Modal'
import Input from '../ui/Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '../ui/Button'
import TextArea from '../ui/TextArea'

const AddOfficeSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo de 3 caracteres' })
    .max(20, { message: 'Máximo de 20 caracteres' }),
  email: z.string().email().min(10, { message: 'Email inválido' }),
  // phone: z
  //   .string()
  //   .min(10, { message: 'Telefone inválido' })
  //   .max(15, { message: 'Telefone inválido' })
  //   .transform((value) =>
  //     value.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2'),
  //   ),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  description: z.string().optional(),
})

type AddOfficeData = z.infer<typeof AddOfficeSchema>

export function FormNewOffice() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddOfficeData>({
    resolver: zodResolver(AddOfficeSchema),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleAddOffice(payload: AddOfficeData) {
    const { token } = parseCookies()

    const { data } = await api.post('/office/create', payload, {
      headers: {
        Authorization: `${token}`,
      },
    })

    return data
  }

  async function handleAddOfficeSubmit(payload: AddOfficeData) {
    mutation.mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleAddOffice,
    onSuccess: () => {
      queryClient.invalidateQueries(['offices'])
    },
  })

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        closeButton
        buttonTitle="Adicionar Escritório"
      >
        <div className="flex flex-col items-start justify-center gap-1 pt-2">
          <h1 className="px-6 text-xl font-bold dark:text-white">
            Formulário de Cadastro
          </h1>
          <p className="px-6 text-base font-normal dark:text-neutral-400">
            Adicione um novo escritório
          </p>
        </div>
        <form
          className="flex flex-col items-stretch justify-start gap-4 p-6"
          onSubmit={handleSubmit(handleAddOfficeSubmit)}
        >
          <div className="flex w-full gap-4">
            <Input
              color="primary"
              type="text"
              placeholder="Nome"
              className="w-full"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              color="primary"
              type="email"
              className="w-full"
              placeholder="Email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="flex w-full gap-4">
            <Input
              color="primary"
              type="text"
              placeholder="Telefone"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              color="primary"
              type="text"
              placeholder="Endereço"
              error={errors.location?.message}
              {...register('location')}
            />
          </div>
          <TextArea
            color="primary"
            placeholder="Descrição sobre este cliente"
            className="w-full p-3"
            error={errors.description?.message}
            {...register('description')}
          />
          <div className="flex w-full gap-4">
            <Input
              color="primary"
              type="text"
              placeholder="Website"
              className="w-full"
              error={errors.website?.message}
              {...register('website')}
            />
          </div>
          {mutation.error ? (
            <p className="mt-1 text-sm dark:text-red-500">
              {
                (mutation.error as { response: { data: { error: string } } })
                  .response.data.error
              }
            </p>
          ) : null}
          <div className="flex w-full items-center justify-end gap-2 pt-4">
            <Button
              color="neutral"
              onClick={() => setIsModalOpen(false)}
              className="z-50"
              type="button"
            >
              Cancelar
            </Button>
            <Button color="primary" className="z-50" type="submit">
              Adicionar Escritório
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

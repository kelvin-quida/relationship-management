'use client'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCookies } from 'nookies'
import { Modal } from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Input from '@/components/ui/Input'
import { api } from '@/lib/api'
import { Combobox } from '@/components/ui/Combobox'
import TextArea from '@/components/ui/TextArea'

const AddClientSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo de 3 caracteres' })
    .max(20, { message: 'Máximo de 20 caracteres' }),
  email: z.string().email().min(10, { message: 'Email inválido' }),
  phone: z
    .string()
    .min(10, { message: 'Telefone inválido' })
    .max(15, { message: 'Telefone inválido' })
    .transform((value) =>
      value.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2'),
    ),
  address: z.string().optional(),
  role: z.string().min(3, { message: 'Mínimo de 3 caracteres' }),
  description: z.string().optional(),
  officeId: z.string().optional(),
})

type AddClientData = z.infer<typeof AddClientSchema>

export function FormNewClient() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddClientData>({
    resolver: zodResolver(AddClientSchema),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleAddClient(payload: AddClientData) {
    const { token } = parseCookies()

    const { data, status } = await api.post('/client/create', payload, {
      headers: {
        Authorization: `${token}`,
      },
    })

    return { data, status }
  }

  async function handleAddClientSubmit(payload: AddClientData) {
    mutation.mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleAddClient,
    onSuccess: () => {
      queryClient.invalidateQueries(['clients'])
    },
  })

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeButton
        onOpenChange={setIsModalOpen}
        buttonTitle="Adicionar Cliente"
      >
        <div className="flex flex-col items-start justify-center gap-1 pt-2">
          <h1 className="px-6 text-xl font-bold dark:text-white">
            Formulário de Cadastro
          </h1>
          <p className="px-6 text-base font-normal dark:text-neutral-400">
            Adicione um novo cliente
          </p>
        </div>
        <form
          className="flex flex-col items-stretch justify-start gap-4 p-6"
          onSubmit={handleSubmit(handleAddClientSubmit)}
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
              error={errors.address?.message}
              {...register('address')}
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
            <Controller
              control={control}
              name="officeId"
              render={({ field: { onChange } }) => (
                <Combobox onValueChange={onChange} />
              )}
            />
            <Input
              color="primary"
              type="text"
              placeholder="Cargo"
              className="w-full"
              error={errors.role?.message}
              {...register('role')}
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
              Adicionar Cliente
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

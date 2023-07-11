'use client'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCookies } from 'nookies'
import { Modal } from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useState } from 'react'
import { Client } from '@prisma/client'
import { Combobox } from '@/components/ui/Combobox'
import TextArea from '@/components/ui/TextArea'

const UpdateClientSchema = z.object({
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

type UpdateClientData = z.infer<typeof UpdateClientSchema>

type Props = {
  data: Client
}

export function FormUpdateClient({ data }: Props) {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateClientData>({
    resolver: zodResolver(UpdateClientSchema),
  })

  async function handleUpdateClient(payload: UpdateClientData) {
    const { token } = parseCookies()

    await api.patch(`/client/update?id=${data.id}`, payload, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  async function handleUpdateClientSubmit(payload: UpdateClientData) {
    mutation.mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleUpdateClient,
    onSuccess: () => {
      queryClient.invalidateQueries(['clients'])
    },
  })

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        buttonTitle="Editar"
        closeButton
      >
        <div className="flex flex-col items-start justify-center gap-1 pt-2">
          <h1 className="px-6 text-xl font-bold dark:text-white">
            Formulário de Edição
          </h1>
          <p className="px-6 text-base font-normal dark:text-neutral-400">
            Edite informações de um cliente
          </p>
        </div>

        <form
          className="flex flex-col items-stretch justify-start gap-4 p-6"
          onSubmit={handleSubmit(handleUpdateClientSubmit)}
        >
          <div className="flex w-full gap-4">
            <Input
              color="primary"
              type="text"
              placeholder="Nome"
              className="w-full"
              defaultValue={data.name ?? ''}
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              color="primary"
              type="email"
              className="w-full"
              placeholder="Email"
              defaultValue={data.email ?? ''}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="flex w-full gap-4">
            <Input
              color="primary"
              type="text"
              placeholder="Telefone"
              defaultValue={data.phone ?? ''}
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              color="primary"
              type="text"
              placeholder="Endereço"
              defaultValue={data.address ?? ''}
              error={errors.address?.message}
              {...register('address')}
            />
          </div>
          <TextArea
            color="primary"
            placeholder="Descrição sobre este cliente"
            className="w-full p-3"
            defaultValue={data.description ?? ''}
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
              defaultValue={data.role ?? ''}
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
              Editar Client
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

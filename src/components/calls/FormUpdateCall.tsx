'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCookies } from 'nookies'
import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import TextArea from '../ui/TextArea'
import { HistoryCall } from '@prisma/client'

const UpdateCallSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo de 3 caracteres' })
    .max(20, { message: 'Máximo de 20 caracteres' }),
  office: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: 'Telefone inválido' })
    .max(15, { message: 'Telefone inválido' })
    .transform((value) =>
      value.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2'),
    ),
  description: z.string().optional(),
  date: z.string().optional(),
})

type UpdateCallData = z.infer<typeof UpdateCallSchema>

type Props = {
  data: HistoryCall
}

export function FormUpdateCall({ data }: Props) {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCallData>({
    resolver: zodResolver(UpdateCallSchema),
  })

  async function handleUpdateCall(payload: UpdateCallData) {
    const { token } = parseCookies()

    await api.patch(`/historycall/update?id=${data.id}`, payload, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  async function handleUpdateCallSubmit(payload: UpdateCallData) {
    mutation.mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleUpdateCall,
    onSuccess: () => {
      queryClient.invalidateQueries(['calls'])
    },
  })

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        closeButton
        buttonTitle="Editar"
      >
        <div className="flex flex-col items-start justify-center gap-1 pt-2">
          <h1 className="px-6 text-xl font-bold text-white">
            Formulário de Edição
          </h1>
          <p className="px-6 text-base font-normal text-neutral-400">
            Edite essa chamada
          </p>
        </div>
        <form
          className="flex flex-col items-stretch justify-start gap-4 p-6"
          onSubmit={handleSubmit(handleUpdateCallSubmit)}
        >
          <div className="flex w-full gap-4">
            <Input
              color="primary"
              type="text"
              placeholder="Nome"
              defaultValue={data.name ?? ''}
              className="w-full"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              color="primary"
              type="text"
              className="w-full"
              defaultValue={data?.office ?? ''}
              placeholder="Escritório"
              error={errors.office?.message}
              {...register('office')}
            />
          </div>

          <div className="flex w-full gap-4">
            <Input
              defaultValue={data.phone ?? ''}
              color="primary"
              type="text"
              placeholder="Telefone"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
          <TextArea
            color="primary"
            placeholder="Descrição sobre esta chamada"
            className="w-full p-3"
            defaultValue={data.description ?? ''}
            error={errors.description?.message}
            {...register('description')}
          />
          <div className="flex w-full gap-4">
            <Input
              defaultValue={data.date ?? ''}
              color="primary"
              type="text"
              placeholder="Data"
              className="w-full"
              error={errors.date?.message}
              {...register('date')}
            />
          </div>
          {mutation.error ? (
            <p className="mt-1 text-sm text-red-500">
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
              Atualizar Chamada
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

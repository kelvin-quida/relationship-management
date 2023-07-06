'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCookies } from 'nookies'
import { Modal } from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useState } from 'react'
import { Client } from '@prisma/client'

const UpdateClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
  officeId: z.string().optional(),
})

type UpdateClientData = z.infer<typeof UpdateClientSchema>

type Props = {
  data: Client
}

export function FormUpdateClient({ data }: Props) {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit } = useForm<UpdateClientData>({
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
      >
        <form
          className="flex flex-col items-center justify-start gap-3"
          onSubmit={handleSubmit(handleUpdateClientSubmit)}
        >
          <h1>Editar</h1>
          <Input
            color="primary"
            type="text"
            placeholder="name"
            defaultValue={data.name}
            {...register('name')}
          />
          <Input
            type="email"
            color="primary"
            placeholder="email"
            defaultValue={data.email}
            {...register('email')}
          />
          <Input
            type="text"
            color="primary"
            placeholder="phone"
            defaultValue={data.phone ?? ''}
            {...register('phone')}
          />
          <Input
            type="text"
            color="primary"
            placeholder="address"
            defaultValue={data.address ?? ''}
            {...register('address')}
          />
          <Input
            type="text"
            color="primary"
            placeholder="role"
            defaultValue={data.role ?? ''}
            {...register('role')}
          />
          <Button color="primary" type="submit">
            ENVIA AI MANO
          </Button>
        </form>
      </Modal>
    </>
  )
}

'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseCookies } from 'nookies'
import { TOfficeWithClient } from '@/types'
import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

const UpdateOfficeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
})

type UpdateOfficeData = z.infer<typeof UpdateOfficeSchema>

type Props = {
  data: TOfficeWithClient
}

export function FormUpdateOffice({ data }: Props) {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit } = useForm<UpdateOfficeData>({
    resolver: zodResolver(UpdateOfficeSchema),
  })

  async function handleUpdateOffice(payload: UpdateOfficeData) {
    const { token } = parseCookies()

    await api.patch(`/office/update?id=${data.id}`, payload, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  async function handleUpdateOfficeSubmit(payload: UpdateOfficeData) {
    mutation.mutate(payload, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleUpdateOffice,
    onSuccess: () => {
      queryClient.invalidateQueries(['offices'])
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
          onSubmit={handleSubmit(handleUpdateOfficeSubmit)}
        >
          <h1>Editar</h1>
          <Input
            color="primary"
            type="text"
            placeholder="Name"
            defaultValue={data.name}
            {...register('name')}
          />
          <Input
            type="text"
            color="primary"
            placeholder="Description"
            defaultValue={data.description ?? ''}
            {...register('description')}
          />
          <Input
            type="text"
            color="primary"
            placeholder="Location"
            defaultValue={data.location ?? ''}
            {...register('location')}
          />
          <Input
            type="email"
            color="primary"
            placeholder="Email"
            defaultValue={data.email}
            {...register('email')}
          />

          <Input
            type="text"
            color="primary"
            placeholder="Phone"
            defaultValue={data.phone ?? ''}
            {...register('phone')}
          />
          <Button color="primary" type="submit">
            ENVIA AI MANO
          </Button>
        </form>
      </Modal>
    </>
  )
}

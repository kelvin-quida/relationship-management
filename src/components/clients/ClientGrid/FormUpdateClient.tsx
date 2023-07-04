'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { TClient } from '@/types'
import { Modal } from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useState } from 'react'

const UpdateClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
  officeId: z.string(),
})

type UpdateClientData = z.infer<typeof UpdateClientSchema>

type Props = {
  data: TClient
}

export function FormUpdateClient({ data }: Props) {
  const { register, handleSubmit } = useForm<UpdateClientData>({
    resolver: zodResolver(UpdateClientSchema),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleUpdateClient({
    email,
    address,
    name,
    phone,
    role,
    officeId,
  }: UpdateClientData) {
    const { token } = parseCookies()

    const { status } = await axios.patch(
      `http://localhost:3000/api/client/update?id=${data.id}`,
      {
        email,
        address,
        name,
        phone,
        role,
        officeId,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )

    if (status === 200) {
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Editar</Button>

      <Modal isOpen={isModalOpen}>
        <Button
          className="absolute right-4 top-4"
          onClick={() => setIsModalOpen(false)}
        >
          Fechar
        </Button>

        <form
          className="flex flex-col items-center justify-start gap-3"
          onSubmit={handleSubmit(handleUpdateClient)}
        >
          <h1>Editar</h1>
          <input
            type="text"
            placeholder="name"
            defaultValue={data.name}
            {...register('name')}
          />
          <input
            type="email"
            placeholder="email"
            defaultValue={data.email}
            {...register('email')}
          />
          <input
            type="text"
            placeholder="phone"
            defaultValue={data.phone}
            {...register('phone')}
          />
          <input
            type="text"
            placeholder="address"
            defaultValue={data.address}
            {...register('address')}
          />
          <input
            type="text"
            placeholder="role"
            defaultValue={data.role}
            {...register('role')}
          />
          <Button type="submit">ENVIA AI MANO</Button>
        </form>
      </Modal>
    </>
  )
}

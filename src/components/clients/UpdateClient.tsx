'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { TClient } from '@/types'
import Button from '../ui/Button'

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

export function UpdateClient({ data }: Props) {
  const { register, handleSubmit } = useForm<UpdateClientData>({
    resolver: zodResolver(UpdateClientSchema),
  })
  const [isOpen, setIsOpen] = useState(false)

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
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        className="flex w-max justify-center rounded-md bg-sky-600 px-4 py-2 text-xs font-semibold leading-6 text-white shadow-sm duration-150 ease-out hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:scale-105"
        onClick={() => setIsOpen(true)}
      >
        Editar
      </button>

      <Dialog
        className="fixed inset-0 z-50  mx-auto flex h-screen w-full items-center justify-center overflow-hidden bg-black/50 px-24 py-12"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto rounded-lg bg-white p-6 text-center shadow-xl">
          <form
            className="flex flex-col items-center justify-start gap-3"
            onSubmit={handleSubmit(handleUpdateClient)}
          >
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
            <input
              type="text"
              placeholder="officeId"
              defaultValue={data.officeId}
              {...register('officeId')}
            />
            <Button type="submit">ENVIA AI MANO</Button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { parseCookies } from 'nookies'

const AddClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
})

type AddClientData = z.infer<typeof AddClientSchema>

export function AddClient() {
  const { register, handleSubmit } = useForm<AddClientData>({
    resolver: zodResolver(AddClientSchema),
  })
  const [isOpen, setIsOpen] = useState(false)

  async function handleAddClientSubmit({
    email,
    address,
    name,
    phone,
    role,
  }: AddClientData) {
    const { token } = parseCookies()

    const { status } = await axios.post(
      'http://localhost:3000/api/client/create',
      {
        email,
        address,
        name,
        phone,
        role,
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
        className="flex w-max justify-center rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm duration-150 ease-out hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-105"
        onClick={() => setIsOpen(true)}
      >
        Adicionar Clientes
      </button>

      <Dialog
        className="fixed inset-0 z-50 mx-auto flex h-screen w-full items-center justify-center overflow-hidden bg-black/50 px-24 py-12"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto rounded-lg bg-white p-6 text-center shadow-xl">
          <form
            className="flex flex-col items-center justify-start gap-3"
            onSubmit={handleSubmit(handleAddClientSubmit)}
          >
            <input type="text" placeholder="name" {...register('name')} />
            <input type="email" placeholder="email" {...register('email')} />
            <input type="text" placeholder="phone" {...register('phone')} />
            <input type="text" placeholder="address" {...register('address')} />
            <input type="text" placeholder="role" {...register('role')} />
            <button type="submit">Enviar</button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { parseCookies } from 'nookies'

const AddOfficeSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
})

type AddOfficeData = z.infer<typeof AddOfficeSchema>

export function AddOffice() {
  const { register, handleSubmit } = useForm<AddOfficeData>({
    resolver: zodResolver(AddOfficeSchema),
  })
  const [isOpen, setIsOpen] = useState(false)

  async function handleAddOfficeSubmit({
    name,
    description,
    location,
    email,
    phone,
  }: AddOfficeData) {
    const { token } = parseCookies()

    const { status } = await axios.post(
      'http://localhost:3000/api/office/create',
      {
        name,
        description,
        location,
        email,
        phone,
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
        Adicionar Escritórios
      </button>

      <Dialog
        className="fixed inset-0 z-50 mx-auto flex h-screen w-full items-center justify-center overflow-hidden bg-black/50 px-24 py-12"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto rounded-lg bg-white p-6 text-center shadow-xl">
          <form
            className="flex flex-col items-center justify-start gap-3"
            onSubmit={handleSubmit(handleAddOfficeSubmit)}
          >
            <input type="text" placeholder="name" {...register('name')} />
            <input type="text" placeholder="description" {...register('description')} />
            <input type="text" placeholder="location" {...register('location')} />
            <input type="email" placeholder="email" {...register('email')} />
            <input type="text" placeholder="phone" {...register('phone')} />
            <button type="submit">Enviar</button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

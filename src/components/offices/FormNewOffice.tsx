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

const AddOfficeSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
})

type AddOfficeData = z.infer<typeof AddOfficeSchema>

export function FormNewOffice() {
  const queryClient = useQueryClient()

  // MAKE A SELECT CLIENT WHEN CREATING AN OFFICE?
  // const { data: offices } = useQuery({
  //   queryKey: ['offices'],
  //   queryFn: getOffices,
  // })

  const { register, handleSubmit } = useForm<AddOfficeData>({
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
        buttonTitle="Adicionar Escritório"
      >
        <form
          className="flex flex-col items-center justify-start gap-3"
          onSubmit={handleSubmit(handleAddOfficeSubmit)}
        >
          <h1>New Office</h1>
          <Input
            color="primary"
            type="text"
            placeholder="Nome"
            {...register('name')}
          />
          <Input
            color="primary"
            type="text"
            placeholder="Description"
            {...register('description')}
          />
          <Input
            color="primary"
            type="text"
            placeholder="Location"
            {...register('location')}
          />
          <Input
            color="primary"
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          <Input
            color="primary"
            type="text"
            placeholder="Phone"
            {...register('phone')}
          />
          <Button color="primary" className="z-50" type="submit">
            Enviar
          </Button>
        </form>
      </Modal>
    </>
  )
}

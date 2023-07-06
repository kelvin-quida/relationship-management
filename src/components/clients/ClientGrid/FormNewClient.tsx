'use client'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { Modal } from '@/components/ui/Modal'
import SelectContainer from '@/components/ui/SelectItem'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { getOffices } from '@/queries/getOffices'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Input from '@/components/ui/Input'
import { api } from '@/lib/api'

const AddClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
  office: z.string().optional(),
  officeId: z.string().optional(),
})

type AddClientData = z.infer<typeof AddClientSchema>

export function FormNewClient() {
  const queryClient = useQueryClient()

  const { data: offices } = useQuery({
    queryKey: ['offices'],
    queryFn: getOffices,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddClientData>({
    resolver: zodResolver(AddClientSchema),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log(errors)

  async function handleAddClient(payload: AddClientData) {
    const { token } = parseCookies()

    const { data } = await api.post(
      '/client/create',
      payload,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )

    return data
  }

  async function handleAddClientSubmit(payload: AddClientData) {
    mutation.mutate(
      payload,
      {
        onSuccess: () => {
          setIsModalOpen(false)
        },
      },
    )
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
        onOpenChange={setIsModalOpen}
        buttonTitle="Adicionar Cliente"
      >
        <form
          className="flex flex-col items-center justify-start gap-3"
          onSubmit={handleSubmit(handleAddClientSubmit)}
        >
          <h1>New Client</h1>
          <Input
            color="primary"
            type="text"
            placeholder="Nome"
            {...register('name')}
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
            placeholder="Telefone"
            {...register('phone')}
          />
          <Input
            color="primary"
            type="text"
            placeholder="Endereço"
            {...register('address')}
          />
          <Controller
            control={control}
            name="officeId"
            render={({ field: { onChange, value } }) => (
              <SelectContainer
                options={offices}
                onValueChange={onChange}
                value={value ?? ''}
              />
            )}
          />
          <Button color="primary" className="z-50" type="submit">
            Enviar
          </Button>
        </form>
      </Modal>
    </>
  )
}

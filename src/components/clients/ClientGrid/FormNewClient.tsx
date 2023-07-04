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

const AddClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
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

  async function handleAddClient({
    name,
    email,
    address,
    phone,
    role,
    office,
    officeId,
  }: AddClientData) {
    const { token } = parseCookies()

    const { data } = await axios.post(
      'http://localhost:3000/api/client/create',
      {
        name,
        email,
        address,
        phone,
        role,
        office,
        officeId,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )

    return data
  }

  async function handleAddClientSubmit({
    name,
    email,
    address,
    phone,
    role,
    office,
    officeId,
  }: AddClientData) {
    mutation.mutate(
      {
        name,
        email,
        address,
        phone,
        role,
        office,
        officeId,
      },
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
      <Button color="primary" onClick={() => setIsModalOpen(true)}>
        Adicionar Client
      </Button>

      <Modal isOpen={isModalOpen}>
        <Button
          color="primary"
          className="absolute right-4 top-4"
          onClick={() => setIsModalOpen(false)}
        >
          Fechar
        </Button>

        <form
          className="flex flex-col items-center justify-start gap-3"
          onSubmit={handleSubmit(handleAddClientSubmit)}
        >
          <h1>New Client</h1>
          <input type="text" placeholder="name" {...register('name')} />
          <input type="email" placeholder="email" {...register('email')} />
          <input type="text" placeholder="phone" {...register('phone')} />
          <input type="text" placeholder="address" {...register('address')} />
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

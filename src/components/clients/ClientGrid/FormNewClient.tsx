import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { Modal } from '@/components/ui/Modal'
import SelectContainer from '@/components/ui/SelectItem'
import Button from '@/components/ui/Button'
import { useState } from 'react'

const AddClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.string().nullable().default(null),
  officeId: z.string().nullable().default(null),
})

type AddClientData = z.infer<typeof AddClientSchema>

export function FormNewClient() {
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

  async function handleAddClientSubmit({
    email,
    address,
    name,
    phone,
    role,
    officeId,
  }: AddClientData) {
    const { token } = parseCookies()

    const { status, data } = await axios.post(
      'http://localhost:3000/api/client/create',
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

    console.log(data)
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Adicionar Client</Button>

      <Modal isOpen={isModalOpen}>
        <Button
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
              <SelectContainer onValueChange={onChange} value={value ?? ''} />
            )}
          />
          <Button className="z-50" type="submit">
            Enviar
          </Button>
        </form>
      </Modal>
    </>
  )
}

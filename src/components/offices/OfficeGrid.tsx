'use client'
import { getOffices } from '@/queries/getOffices'
import { TOfficeWithClient } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { useDataContext } from '@/context/MainContext'
import { FormNewOffice } from './FormNewOffice'
import SliderModal from '../ui/SliderModal'
import { FormUpdateOffice } from './FormUpdateOffice'
import { api } from '@/lib/api'
import Box from '../ui/Box'
import Input from '../ui/Input'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import DeleteModal from '../ui/Modal/DeleteModal'
import Button from '../ui/Button'

const filterTitles = [
  { title: 'Sel' },
  { title: 'Nome' },
  { title: 'Escritório' },
  { title: 'Telefone' },
  { title: 'Role' },
  { title: 'Ações' },
]

export default function OfficeGrid() {
  const { openDialog, setOfficeDataContext } = useDataContext()

  const queryClient = useQueryClient()

  const { data: offices } = useQuery({
    queryKey: ['offices'],
    queryFn: getOffices,
  })

  async function handleRemoveOffice(id: string) {
    const { token } = parseCookies()

    await api.delete(`office/delete?id=${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleRemoveOffice,
    onMutate: async (clientID) => {
      await queryClient.cancelQueries({ queryKey: ['offices'] })
      const previousClients = queryClient.getQueryData(['offices'])

      queryClient.setQueryData<TOfficeWithClient[]>(['offices'], (old) => {
        return old?.filter(({ id }) => id !== clientID)
      })

      return { previousClients }
    },
    onError: (_err, _deleteClients, context) => {
      queryClient.setQueryData(['clients'], context?.previousClients)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['clients'])
    },
  })

  function handleOpenModal(data: TOfficeWithClient) {
    openDialog()
    setOfficeDataContext(data)
  }

  return (
    <>
      <SliderModal />
      <Box className="relative h-full overflow-hidden">
        <div className="z-50 flex w-full items-center justify-between bg-neutral-900 pb-6 pt-0 duration-150 ease-out">
          {/* Dropdown Insert */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              <svg
                className="h-5 w-5 text-neutral-500 dark:text-neutral-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <Input
              color="primary"
              type="text"
              id="table-search"
              placeholder="Buscar cliente"
              className="pl-10"
            />
          </div>
          <FormNewOffice />
        </div>
        <div className="h-[calc(100%-60px)] w-full overflow-hidden">
          <ScrollArea.Root className="h-full w-full">
            <ScrollArea.Viewport className="h-full w-full scroll-pb-10">
              <table className="h-full w-full text-sm text-neutral-400">
                <thead className="text-xs uppercase">
                  <tr>
                    {filterTitles.map((item, index) => (
                      <th key={index} scope="col" className="p-4">
                        <div className="flex w-full items-center justify-start">
                          <p className="text-center text-zinc-500">
                            {item.title}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {offices?.map((data, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer select-none rounded-lg border border-transparent duration-150 ease-out"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="h-4 w-4 cursor-pointer rounded border-neutral-700 bg-neutral-800 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        onClick={() => handleOpenModal(data)}
                        className="flex flex-col items-start justify-center gap-1 whitespace-nowrap  rounded-lg border border-transparent p-4 font-medium text-neutral-500 duration-150 ease-out hover:border-neutral-700 hover:bg-neutral-800"
                      >
                        <h4 className="text-sm font-bold text-neutral-100">
                          {data.name}
                        </h4>
                        <p className="text-sm font-normal text-neutral-500">
                          {data.email}
                        </p>
                      </th>
                      <td className="p-4">{data.location}</td>
                      <td className="p-4">{data.phone}</td>
                      <td className="p-4">{data.description}</td>

                      <td className="flex items-center justify-end gap-2 p-4">
                        <FormUpdateOffice data={data} />
                        <DeleteModal
                          title="Remover Escritório"
                          description="Tem certeza que deseja remover o escritório?"
                        >
                          <Button
                            onClick={() => mutation.mutate(data.id)}
                            color="warn"
                          >
                            Remover
                          </Button>
                        </DeleteModal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none rounded-full bg-neutral-900 transition-colors duration-[160ms] ease-out hover:bg-neutral-950 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-emerald-700 before:absolute before:left-1/2 before:top-1/2 before:h-10 before:min-h-[14px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </div>
      </Box>
    </>
  )
}

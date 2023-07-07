'use client'
import { getClients } from '@/queries/getClients'
import { TClientWithOffice } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { useDataContext } from '@/context/MainContext'
import SliderModal from '@/components/ui/SliderModal'
import { FormNewClient } from './FormNewClient'
import Box from '@/components/ui/Box'
import Input from '@/components/ui/Input'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  Table as TTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import DeleteModal from '@/components/ui/Modal/DeleteModal'
import { FormUpdateClient } from './FormUpdateClient'

type Client = {
  id: string
  name: string
  office: string | undefined
  phone: string | null
  role: string | null
}

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button color="neutral" onClick={column.getToggleSortingHandler()}>
          Nome ({/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{ asc: 'asc', desc: 'desc' }[column.getIsSorted() as string] ?? null}
          )
        </Button>
      )
    },
  },
  {
    accessorKey: 'office',
    header: ({ column }) => {
      return (
        <Button color="neutral" onClick={column.getToggleSortingHandler()}>
          Escritório ({/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{ asc: 'asc', desc: 'desc' }[column.getIsSorted() as string] ?? null}
          )
        </Button>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button color="neutral" onClick={column.getToggleSortingHandler()}>
          Cargo ({/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{ asc: 'asc', desc: 'desc' }[column.getIsSorted() as string] ?? null}
          )
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: () => null,
  },
]

export const data: Client[] = [
  {
    id: '1',
    name: 'Daniel Gabriel',
    office: 'Vercel',
    phone: '213123213',
    role: 'Admin',
  },
  {
    id: '2',
    name: 'Armitage',
    office: 'Buffalo Bills',
    phone: '498908123',
    role: 'Admin',
  },
  {
    id: '3',
    name: 'Juca Bala',
    office: 'Riot Games',
    phone: '9825908324',
    role: 'Admin',
  },
  {
    id: '4',
    name: 'Meluiz',
    office: 'Supabase',
    phone: '9128390',
    role: 'Admin',
  },
]

export default function ClientGrid() {
  const queryClient = useQueryClient()

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })

  async function handleRemoveClient(id: string) {
    const { token } = parseCookies()

    await api.delete(`/client/delete?id=${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleRemoveClient,
    onMutate: async (clientID) => {
      await queryClient.cancelQueries({ queryKey: ['clients'] })
      const previousClients = queryClient.getQueryData(['clients'])

      queryClient.setQueryData<TClientWithOffice[]>(['clients'], (old) => {
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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const clientsTableData = useMemo(() => {
    return (clients ?? []).map((client) => ({
      id: client.id,
      name: client.name,
      office: client.office?.name,
      phone: client.phone,
      role: client.role,
    }))
  }, [clients])

  const table = useReactTable({
    data: clientsTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  })

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
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
            />
          </div>
          <FormNewClient />
        </div>
        <div className="h-[calc(100%-60px)] w-full overflow-hidden">
          <ScrollArea.Root className="h-full w-full">
            <ScrollArea.Viewport className="h-full w-full scroll-pb-10">
              <Table
                table={table}
                clients={clients}
                onDelete={(index) =>
                  mutation.mutate(clientsTableData[index].id)
                }
              />
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="duration-[160ms] flex touch-none select-none rounded-full bg-neutral-900 transition-colors ease-out hover:bg-neutral-950 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
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

type TableProps = {
  table: TTable<Client>
  clients?: TClientWithOffice[]
  onDelete: (index: number) => void
}
const Table = ({ table, clients, onDelete }: TableProps) => {
  const { openDialog, setClientDataContext } = useDataContext()

  function handleOpenModal(data: TClientWithOffice) {
    openDialog()
    setClientDataContext(data)
  }

  return (
    <>
      <table className="h-full w-full text-sm text-neutral-400">
        <thead className="text-xs uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} scope="col" className="p-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="cursor-pointer select-none rounded-lg border border-transparent duration-150 ease-out"
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.id.includes('actions')) {
                    return (
                      <td key={cell.id}>
                        <DeleteModal
                          title="Remover cliente"
                          description="Tem certeza que deseja remover o cliente?"
                        >
                          <Button
                            onClick={() => onDelete(cell.row.index)}
                            color="warn"
                          >
                            Deletar
                          </Button>
                        </DeleteModal>
                        {clients?.[cell.row.index] && (
                          <FormUpdateClient data={clients[cell.row.index]} />
                        )}
                      </td>
                    )
                  }
                  return (
                    <td
                      key={cell.id}
                      className="p-4"
                      onClick={() => {
                        if (
                          cell.id.includes('name') &&
                          clients?.[cell.row.index]
                        ) {
                          handleOpenModal(clients[cell.row.index])
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            ))
          ) : (
            <tr className="cursor-pointer select-none rounded-lg border border-transparent duration-150 ease-out">
              <td colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          color="primary"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          color="primary"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}

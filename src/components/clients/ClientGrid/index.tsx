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
} from '@tanstack/react-table'
import { useState } from 'react'

type Client = {
  id: string
  name: string
  office: string
  phone: string
  role: string
}

const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    header: ({ table }) => null,
    cell: ({ row }) => (
      <input
        id="checkbox-table-search-1"
        type="checkbox"
        className="h-4 w-4 cursor-pointer rounded border-neutral-700 bg-neutral-800 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
        checked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.currentTarget.checked)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: 'Escritório',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'role',
    header: 'Cargo',
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
  const { openDialog, setClientDataContext } = useDataContext()

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

  function handleOpenModal(data: TClientWithOffice) {
    openDialog()
    setClientDataContext(data)
  }

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  console.log(rowSelection)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      sorting,
      rowSelection,
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
              <Table table={table} />
              {/* <table className="h-full w-full text-sm text-neutral-400">
                <thead className="text-xs uppercase">
                  <tr>
                    {filterTitles.map((item, index) => (
                      <>
                        <th key={index} scope="col" className="p-4">
                          <div className="flex w-full items-center justify-start">
                            <p className="text-center text-zinc-500">
                              {item.title}
                            </p>
                          </div>
                        </th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients?.map((item, index) => {
                    console.log(item.office)
                    return (
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
                          onClick={() => handleOpenModal(item)}
                          className="flex flex-col items-start justify-center gap-1 whitespace-nowrap  rounded-lg border border-transparent p-4 font-medium text-neutral-500 duration-150 ease-out hover:border-neutral-700 hover:bg-neutral-800"
                        >
                          <h4 className="text-sm font-bold text-neutral-100">
                            {item.name}
                          </h4>
                          <p className=" text-sm font-normal text-neutral-500">
                            {item.email}
                          </p>
                        </th>
                        <td className=" p-4 text-left">
                          {item.office?.name ?? 'Tem não'}
                        </td>
                        <td className=" p-4">{item.phone}</td>
                        <td className=" p-4">{item.role}</td>
                        <td className="flex items-center justify-end gap-2 p-4">
                          <FormUpdateClient data={item} />
                          <DeleteModal
                            title="Remover cliente"
                            description="Tem certeza que deseja remover o cliente?"
                          >
                            <Button
                              onClick={() => mutation.mutate(item.id)}
                              color="warn"
                            >
                              Remover
                            </Button>
                          </DeleteModal>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table> */}
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

const Table = ({ table }: { table: TTable<Client> }) => {
  return (
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr className="cursor-pointer select-none rounded-lg border border-transparent duration-150 ease-out">
            <td colSpan={columns.length} className="h-24 text-center">
              No results.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

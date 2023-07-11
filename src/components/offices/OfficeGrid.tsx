'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import SliderModal from '@/components/ui/SliderModal'
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
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { getOffices } from '@/queries/getOffices'
import { TOfficeWithClient } from '@/types'
import { FormNewOffice } from './FormNewOffice'
import { FormUpdateOffice } from './FormUpdateOffice'
import Link from 'next/link'

type Office = {
  id: string
  name: string
  phone: string | null
  location: string | null
  website: string | null
}

const columns: ColumnDef<Office>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          color="none"
          className="flex items-center justify-center gap-2 p-0"
          onClick={column.getToggleSortingHandler()}
        >
          Nome {/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{
            asc: <ChevronDownIcon className="h-4 w-4" />,
            desc: <ChevronUpIcon className="h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          color="none"
          className="flex items-center justify-center gap-2 p-0"
          onClick={column.getToggleSortingHandler()}
        >
          Telefone {/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{
            asc: <ChevronDownIcon className="h-4 w-4" />,
            desc: <ChevronUpIcon className="h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
  },
  {
    accessorKey: 'website',
    header: 'Website',
  },
  {
    accessorKey: 'location',
    header: ({ column }) => {
      return (
        <Button
          color="none"
          className="flex items-center justify-center gap-2 p-0"
          onClick={column.getToggleSortingHandler()}
        >
          Localização {/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{
            asc: <ChevronDownIcon className="h-4 w-4" />,
            desc: <ChevronUpIcon className="h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: () => null,
  },
]

export default function OfficeGrid() {
  const queryOffice = useQueryClient()

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
    onMutate: async (officeID) => {
      await queryOffice.cancelQueries({ queryKey: ['offices'] })
      const previousoffices = queryOffice.getQueryData(['offices'])

      queryOffice.setQueryData<TOfficeWithClient[]>(['offices'], (old) => {
        return old?.filter(({ id }) => id !== officeID)
      })

      return { previousoffices }
    },
    onError: (_err, _deleteoffices, context) => {
      queryOffice.setQueryData(['offices'], context?.previousoffices)
    },
    onSettled: () => {
      queryOffice.invalidateQueries(['offices'])
    },
  })

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const officesTableData = useMemo(() => {
    return (offices ?? []).map((office) => ({
      id: office.id,
      name: office.name,
      phone: office.phone,
      website: office.website,
      location: office.location,
    }))
  }, [offices])

  const table = useReactTable({
    data: officesTableData,
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
        <div className="z-50 flex w-full items-center justify-between dark:bg-neutral-900 pb-6 pt-0 duration-150 ease-out">
          {/* Dropdown Insert */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-500">
              <svg
                className="h-5 w-5 dark:text-neutral-500 dark:text-neutral-400"
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
              placeholder="Buscar Escritório"
              className="pl-10"
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <FormNewOffice />
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                color="neutral"
                className="flex h-10 w-10 items-center justify-center p-1.5 dark:text-neutral-500 duration-150 ease-out dark:hover:text-neutral-300"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                color="neutral"
                className="flex h-10 w-10 items-center justify-center p-1.5 dark:text-neutral-500 duration-150 ease-out dark:hover:text-neutral-300"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="h-[calc(100%-60px)] w-full overflow-hidden">
          <ScrollArea.Root className="h-full w-full">
            <ScrollArea.Viewport className="h-full w-full pb-10">
              <Table
                table={table}
                offices={offices}
                onDelete={(index) =>
                  mutation.mutate(officesTableData[index].id)
                }
              />
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="duration-[160ms] flex touch-none select-none rounded-full dark:bg-neutral-900 transition-colors ease-out dark:hover:bg-neutral-950 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full dark:bg-emerald-700 before:absolute before:left-1/2 before:top-1/2 before:h-10 before:min-h-[14px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </div>
      </Box>
    </>
  )
}

type TableProps = {
  table: TTable<Office>
  offices?: TOfficeWithClient[]
  onDelete: (index: number) => void
}
const Table = ({ table, offices, onDelete }: TableProps) => {
  return (
    <>
      <table className="h-full w-full text-sm dark:text-neutral-400">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    scope="col"
                    className={cn({
                      'text-left': true,
                      'px-4 text-left': header.id.includes('name'),
                    })}
                  >
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
                      <td key={cell.id} className="flex gap-2">
                        {offices?.[cell.row.index] && (
                          <FormUpdateOffice data={offices[cell.row.index]} />
                        )}
                        <DeleteModal
                          title="Remover escritório"
                          description="Tem certeza que deseja remover o escritório?"
                        >
                          <Button
                            onClick={() => onDelete(cell.row.index)}
                            color="warn"
                          >
                            Deletar
                          </Button>
                        </DeleteModal>
                      </td>
                    )
                  }
                  return (
                    <td
                      key={cell.id}
                      className={cn({
                        'my-2 mr-10 flex cursor-pointer flex-col items-start justify-center gap-1 rounded-lg border border-transparent p-4 text-base font-semibold dark:text-white duration-150 ease-out text-neutral-800 hover:border-neutral-300 hover:bg-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800':
                          cell.id.includes('name'),
                      })}
                    >
                      <Link
                        href={
                          cell.id.includes('name')
                            ? `/offices/${offices?.[cell.row.index].id}`
                            : '#'
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                        {cell.id.includes('name') &&
                        offices?.[cell.row.index] ? (
                          <p className="text-sm font-normal text-neutral-700 dark:text-neutral-400">
                            {offices?.[cell.row.index].email}
                          </p>
                        ) : null}
                      </Link>
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
    </>
  )
}

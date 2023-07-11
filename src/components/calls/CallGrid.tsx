'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
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
import Link from 'next/link'
import { getCalls } from '@/queries/getCalls'
import { HistoryCall } from '@prisma/client'
import { FormNewCall } from './FormNewCall'
import { FormUpdateCall } from './FormUpdateCall'

const columns: ColumnDef<HistoryCall>[] = [
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
    accessorKey: 'office',
    header: ({ column }) => {
      return (
        <Button
          color="none"
          className="flex items-center justify-center gap-2 p-0"
          onClick={column.getToggleSortingHandler()}
        >
          Escritório {/* getIsSorted retorna false | 'asc' | 'desc' */}
          {{
            asc: <ChevronDownIcon className="h-4 w-4" />,
            desc: <ChevronUpIcon className="h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
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
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          color="none"
          className="flex items-center justify-center gap-2 p-0"
          onClick={column.getToggleSortingHandler()}
        >
          Data {/* getIsSorted retorna false | 'asc' | 'desc' */}
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

export default function CallGrid() {
  const queryCall = useQueryClient()

  const { data: calls } = useQuery({
    queryKey: ['calls'],
    queryFn: getCalls,
  })

  async function handleRemoveOffice(id: string) {
    const { token } = parseCookies()

    await api.delete(`historycall/delete?id=${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  const mutation = useMutation({
    mutationFn: handleRemoveOffice,
    onMutate: async (officeID) => {
      await queryCall.cancelQueries({ queryKey: ['calls'] })
      const previouscalls = queryCall.getQueryData(['calls'])

      queryCall.setQueryData<HistoryCall[]>(['calls'], (old) => {
        return old?.filter(({ id }) => id !== officeID)
      })

      return { previouscalls }
    },
    onError: (_err, _deleteoffices, context) => {
      queryCall.setQueryData(['calls'], context?.previouscalls)
    },
    onSettled: () => {
      queryCall.invalidateQueries(['calls'])
    },
  })

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const callsTableData = useMemo(() => {
    return (calls ?? []).map((call) => ({
      id: call.id,
      name: call.name,
      office: call.office,
      phone: call.phone,
      description: call.description,
      date: call.date,
    }))
  }, [calls])

  const table = useReactTable({
    data: callsTableData,
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
              placeholder="Buscar Chamada"
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
            <FormNewCall />
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                color="neutral"
                className="flex h-10 w-10 items-center justify-center p-1.5 text-neutral-500 duration-150 ease-out hover:text-neutral-300"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                color="neutral"
                className="flex h-10 w-10 items-center justify-center p-1.5 text-neutral-500 duration-150 ease-out hover:text-neutral-300"
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
                calls={calls}
                onDelete={(index) => mutation.mutate(callsTableData[index].id)}
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
  table: TTable<HistoryCall>
  calls?: HistoryCall[]
  onDelete: (index: number) => void
}
const Table = ({ table, calls, onDelete }: TableProps) => {
  return (
    <>
      <table className="h-full w-full text-sm text-neutral-400">
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
                        {calls?.[cell.row.index] && (
                          <FormUpdateCall data={calls[cell.row.index]} />
                        )}
                        <DeleteModal
                          title="Remover chamada"
                          description="Tem certeza que deseja remover o chamada?"
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
                        'my-2 mr-10 flex cursor-pointer flex-col items-start justify-center gap-1 rounded-lg border border-transparent p-4 text-base font-semibold text-white duration-150 ease-out hover:border-neutral-700 hover:bg-neutral-800':
                          cell.id.includes('name'),
                      })}
                    >
                      <Link
                        href={
                          cell.id.includes('name')
                            ? `/calls/${calls?.[cell.row.index].id}`
                            : '#'
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                        {cell.id.includes('name') && calls?.[cell.row.index] ? (
                          <p className="text-sm font-normal text-neutral-400">
                            {calls?.[cell.row.index].phone}
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

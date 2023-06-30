'use client'
import { TClient } from '@/types'
import axios from 'axios'
import { parseCookies } from 'nookies'

type Props = {
  categorTitle: string
  dataList: TClient[]
}

const filterTitles = [
  { title: 'Sel' },
  { title: 'Nome' },
  { title: 'Escritório' },
  { title: 'Telefone' },
  { title: 'Role' },
  { title: 'Ações' },
]

export default function ClientGrid({ categorTitle, dataList }: Props) {
  const { token } = parseCookies()

  function handleRemoveClient(id: string) {
    axios.delete(`http://localhost:3000/api/client/delete?id=${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  }

  return (
    <>
      <div className="relative w-full overflow-x-auto border  border-slate-200 bg-white p-6 sm:rounded-lg">
        <div className="flex items-center justify-between pb-4">
          {/* Dropdown */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
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
            <input
              type="text"
              id="table-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500"
              placeholder="Buscar cliente"
            />
          </div>
          <button
            type="submit"
            className="flex w-max justify-center rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm duration-150 ease-out hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-105"
          >
            Adicionar {categorTitle}
          </button>
        </div>
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {filterTitles.map((item, index) => (
                <>
                  <th key={index} scope="col" className="p-4">
                    <div className="flex w-full items-center justify-start">
                      <p className="text-center text-zinc-500">{item.title}</p>
                    </div>
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataList.map(
              (
                { name, email, phone, role, office, id }: TClient,
                index: any,
              ) => (
                <tr
                  key={index}
                  className="cursor-pointer select-none rounded-lg bg-white duration-150 ease-out hover:-translate-y-1 hover:bg-zinc-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-orange-600 dark:focus:ring-offset-gray-800"
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
                    className="flex flex-col items-start justify-center whitespace-nowrap p-4 font-medium text-gray-900 dark:text-white"
                  >
                    <h4 className="text-sm font-bold text-slate-800">{name}</h4>
                    <p className="text-sm font-normal text-zinc-500">{email}</p>
                  </th>
                  <td className="p-4 text-left">{office || 'Tem não'}</td>
                  <td className="p-4">{phone}</td>
                  <td className="p-4">{role}</td>
                  <td className="flex items-center justify-start gap-2 p-4">
                    <button
                      type="submit"
                      className="flex w-max justify-center rounded-md bg-sky-600 px-4 py-2 text-xs font-semibold leading-6 text-white shadow-sm duration-150 ease-out hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:scale-105"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleRemoveClient(id)}
                      className="flex w-max justify-center rounded-md border border-red-500 bg-red-100 px-4 py-2 text-xs font-semibold leading-6 text-red-800 shadow-sm duration-150 ease-out hover:bg-red-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:scale-105"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

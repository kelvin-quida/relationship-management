import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Clientes', href: '/clients', current: false },
  { name: 'Escritórios', href: '/offices', current: false },
  { name: 'Calendário', href: '/calendar', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Topbar() {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-zinc-100">
          {({ open }) => (
            <>
              <div className="mx-auto w-full max-w-7xl px-6">
                <div className="flex h-16 items-center justify-start">
                  <div className="flex items-center">
                    <div className="shrink-0"></div>
                    <div className="hidden md:block">
                      <div className="flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-orange-500 text-white'
                                : 'text-zinc-500 hover:bg-zinc-200 hover:text-gray-800',
                              'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-600 hover:bg-gray-700 hover:text-gray-800 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-gray-800'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-gray-800',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}

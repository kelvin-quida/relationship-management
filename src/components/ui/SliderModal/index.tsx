'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDataContext } from '@/context/MainContext'
import Button from '../Button'
import Anchor from '../Anchor'
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

export default function SliderModal() {
  const { isDialogOpen, closeDialog, openDialog, clientData } = useDataContext()

  return (
    <Transition.Root show={isDialogOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={openDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-100/70 dark:bg-neutral-950/60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-[80vw]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-4 top-4">
                      <Button
                        type="button"
                        color="neutral"
                        onClick={closeDialog}
                      >
                        Fechar
                      </Button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-screen w-full flex-col overflow-auto rounded-l-3xl border dark:border-neutral-800 bg-neutral-100 dark:bg-background p-4 py-6 pt-16 ">
                    <div className="px-4 py-6 dark:text-white sm:px-6">
                      <div className="flex flex-col items-start justify-start gap-4">
                        <h1 className="text-6xl font-semibold">
                          {clientData?.name}
                        </h1>
                        <div className="flex items-center justify-start gap-3">
                          <Anchor
                            draggable={false}
                            href={`mailto:${clientData?.email}`}
                            target="_blank"
                            color="neutral"
                            className="flex items-center justify-start gap-2 border-transparent bg-transparent pl-0 dark:text-neutral-400 hover:pl-4"
                          >
                            <EnvelopeIcon className="h-5 w-5" />
                            <p>{clientData?.email}</p>
                          </Anchor>
                          <Anchor
                            color="neutral"
                            className="flex items-center justify-start gap-2 border-transparent bg-transparent dark:text-neutral-400"
                          >
                            <PhoneIcon className="h-5 w-5" />
                            <p>{clientData?.phone}</p>
                          </Anchor>
                          <Anchor
                            color="neutral"
                            target="_blank"
                            href={`/offices/${clientData?.office?.id}`}
                            className="flex items-center justify-start gap-2 border-transparent bg-transparent dark:text-neutral-400"
                          >
                            <BuildingOfficeIcon className="h-5 w-5" />
                            <p className="select-none">
                              {clientData?.office?.name ?? 'Sem Empresa'}
                            </p>
                          </Anchor>
                          {clientData?.role && (
                            <Anchor
                              target="_blank"
                              color="neutral"
                              className="flex items-center justify-start gap-2 border-transparent bg-transparent dark:text-neutral-400"
                            >
                              <UserIcon className="h-5 w-5" />
                              <p>{clientData?.role}</p>
                            </Anchor>
                          )}
                        </div>

                        {clientData?.description && (
                          <p className="mt-6 w-full max-w-2xl rounded-lg border border-transparent p-4 text-sm dark:text-neutral-400 duration-150 ease-out dark:hover:border-neutral-800 ">
                            {clientData?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

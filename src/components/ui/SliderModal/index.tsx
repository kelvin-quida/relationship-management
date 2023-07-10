'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDataContext } from '@/context/MainContext'
import Button from '../Button'

export default function SliderModal() {
  const { isDialogOpen, closeDialog, officeData, openDialog, clientData } =
    useDataContext()

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
          <div className="fixed inset-0 bg-neutral-950/60 transition-opacity" />
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
                  <div className="flex h-screen w-full flex-col overflow-auto rounded-l-3xl border border-neutral-800 bg-background p-4 py-6 pt-16 ">
                    <div className="px-4 text-white sm:px-6">
                      <p>
                        {' '}
                        {clientData ? (
                          <p className="text-white">
                            {JSON.stringify(clientData)}
                          </p>
                        ) : (
                          <p>{JSON.stringify(officeData)}</p>
                        )}
                      </p>
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

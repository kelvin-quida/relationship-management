'use client'
import { ReactNode, useState } from 'react'
import { Dialog } from '@headlessui/react'

type Props = {
  isOpen: boolean
  children: ReactNode
}

export function Modal({ isOpen, children }: Props) {
  const [, setIsModalOpen] = useState(isOpen)

  return (
    <>
      <Dialog
        className="fixed inset-0 z-50 mx-auto flex h-screen w-full items-center justify-center overflow-hidden bg-black/50 px-24 py-12"
        open={isOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Dialog.Panel className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto rounded-lg bg-white p-6 text-center shadow-xl">
          {children}
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

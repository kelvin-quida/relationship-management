import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import Button from '../Button'

type Props = {
  children: React.ReactNode
  title: string
  description: string
}

const DeleteModal = ({ children, title, description }: Props) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button color="warn">Remover</Button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/70  data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="text-[20px] font-bold text-white">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-neutral-400">
          {description}
        </Dialog.Description>
        <div className="mt-8 flex w-full items-center justify-end gap-4">
          <Dialog.Close asChild>{children}</Dialog.Close>
          <Dialog.Close asChild>
            <Button color="neutral">Cancelar</Button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-white hover:bg-rose-500 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default DeleteModal

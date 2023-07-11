import { ReactNode } from 'react'
import Button from '../Button'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  buttonTitle: string
  isOpen?: boolean
  closeButton?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export function Modal({
  children,
  buttonTitle,
  isOpen,
  closeButton,
  onOpenChange,
}: Props) {
  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <Button color="primary">{buttonTitle}</Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70  data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[720px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            {children}

            <Dialog.Close asChild>
              {!closeButton && (
                <Button color="neutral" className="absolute right-4 top-4">
                  Fechar
                </Button>
              )}
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

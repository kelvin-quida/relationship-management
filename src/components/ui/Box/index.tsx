import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type Props = {
  className?: string
  children?: ReactNode
}

const box = tv({
  base: 'group h-max w-full rounded-xl border border-neutral-800 bg-neutral-900 p-6',
  variants: {},
})

export default function Box({ className, children, ...rest }: Props) {
  return (
    <div {...rest} className={box({ className })}>
      {children}
    </div>
  )
}

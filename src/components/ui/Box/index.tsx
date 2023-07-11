import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type Props = {
  className?: string
  children?: ReactNode
}

const box = tv({
  base: 'dark:border-neutral-800 dark:bg-neutral-900 group h-max w-full rounded-xl border border-neutral-200 bg-neutral-100 p-6',
  variants: {},
})

export default function Box({ className, children, ...rest }: Props) {
  return (
    <div {...rest} className={box({ className })}>
      {children}
    </div>
  )
}

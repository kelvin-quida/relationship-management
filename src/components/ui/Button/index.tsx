import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: ReactNode
  color: 'primary'
}

const button = tv({
  base: 'h-10 w-max rounded-lg px-4 duration-150 ease-out active:scale-95 active:opacity-80',
  variants: {
    color: {
      primary: 'bg-emerald-600 text-sm text-white',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

export default function Button({ className, children, color, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={button({
        color,
        className,
      })}
    >
      {children}
    </button>
  )
}

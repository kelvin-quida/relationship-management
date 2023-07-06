import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: ReactNode
  color: 'primary' | 'warn' | 'neutral'
}

const button = tv({
  base: 'h-10 w-max rounded-lg px-4 duration-150 ease-out active:scale-95 active:opacity-80',
  variants: {
    color: {
      primary:
        'border border-emerald-500 bg-emerald-700 text-sm  text-white hover:bg-emerald-500',
      warn: 'border border-rose-500 bg-rose-950/50 text-sm text-rose-400 hover:bg-rose-500 hover:text-white',
      neutral:
        'border border-neutral-800 bg-neutral-900 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white',
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

import { InputHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  color: 'primary'
}

const input = tv({
  base: 'block h-10 w-80 rounded-lg p-2 pl-10 text-sm',
  variants: {
    color: {
      primary:
        'border border-transparent bg-neutral-900/60 text-neutral-200 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

export default function Input({ className, color, ...rest }: Props) {
  return (
    <input
      {...rest}
      className={input({
        color,
        className,
      })}
    />
  )
}

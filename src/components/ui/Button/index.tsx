import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: ReactNode
}

const button = tv({
  base: 'rounded-full bg-blue-500 font-medium text-white active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export default function Button({ className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={button({
        size: 'sm',
        color: 'secondary',
        className,
      })}
    >
      {children}
    </button>
  )
}

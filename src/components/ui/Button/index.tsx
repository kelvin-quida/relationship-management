import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: ReactNode
  color?: 'primary' | 'warn' | 'neutral' | 'none'
}

const button = tv({
  base: 'h-10 w-max rounded-lg px-4 duration-150 ease-out active:scale-95 active:opacity-80',
  variants: {
    color: {
      primary:
        'border border-emerald-500 bg-emerald-700 text-sm  text-white hover:bg-emerald-500',
      warn: 'border border-rose-500 bg-rose-900 text-rose-200 dark:bg-rose-950/50 text-sm dark:text-rose-400 hover:bg-rose-500 hover:text-white',
      neutral:
        'border dark:border-neutral-800 border-neutral-200 bg-neutral-200 dark:bg-neutral-900 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-white',
      none: 'text-sm dark:text-neutral-400  text-neutral-700 hover:text-neutral-900  dark:hover:text-white',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, color, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={button({
          color,
          className,
        })}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button

import { InputHTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  color: 'primary'
}

const input = tv({
  base: 'block h-10 w-80 rounded-lg px-4 text-sm',
  variants: {
    color: {
      primary:
        'border border-neutral-700/50 bg-neutral-800/50 text-neutral-200 placeholder:text-neutral-500 focus:border-emerald-500 focus:ring-emerald-500',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, color, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={input({
          color,
          className,
        })}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input

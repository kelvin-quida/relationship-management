import { AnchorHTMLAttributes, ReactNode, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
  children: ReactNode
  color?: 'primary' | 'warn' | 'neutral' | 'none'
}

const anchor = tv({
  base: 'h-10 w-max rounded-lg px-4 duration-150 ease-out active:scale-95 active:opacity-80',
  variants: {
    color: {
      primary:
        'dark:text-white border border-emerald-500 bg-emerald-700 text-sm text-neutral-950 hover:bg-emerald-500',
      warn: 'border border-rose-500 bg-rose-950/50 text-sm text-rose-400 hover:bg-rose-500 hover:text-white',
      neutral:
        'dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-200 bg-neutral-100 text-sm text-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white',
      none: 'text-sm text-neutral-400 hover:text-white',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

const Anchor = forwardRef<HTMLAnchorElement, Props>(
  ({ className, children, color, ...rest }, ref) => {
    return (
      <a
        {...rest}
        ref={ref}
        className={anchor({
          color,
          className,
        })}
      >
        {children}
      </a>
    )
  },
)

Anchor.displayName = 'Anchor'

export default Anchor

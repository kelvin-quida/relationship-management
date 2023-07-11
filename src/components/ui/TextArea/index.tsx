import { TextareaHTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  color: 'primary'
}

const textarea = tv({
  base: 'block h-32 w-80 rounded-lg px-4 text-sm',
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

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, color, ...rest }, ref) => {
    return (
      <textarea
        {...rest}
        ref={ref}
        className={textarea({
          color,
          className,
        })}
      />
    )
  },
)

TextArea.displayName = 'TextArea'

export default TextArea

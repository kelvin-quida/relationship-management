import { TextareaHTMLAttributes, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  color: 'primary'
  error?: string
}

const textarea = tv({
  base: 'block h-32 w-80 rounded-lg px-4 text-sm',
  variants: {
    color: {
      primary:
        'border border-neutral-300 bg-neutral-200 placeholder:text-neutral-500 dark:border-neutral-700/50 dark:bg-neutral-800/50 text-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-500 focus:border-emerald-500 focus:ring-emerald-500',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, color, error, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col items-start justify-start gap-1">
        <textarea
          {...rest}
          ref={ref}
          className={textarea({
            color,
            className,
          })}
        />
        {error && (
          <p className="p-1 text-xs font-light dark:text-red-500">{error}</p>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'

export default TextArea

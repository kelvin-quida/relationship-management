'use client'
import Link from 'next/link'
import { AnchorHTMLAttributes, ReactNode, useState } from 'react'
import { tv } from 'tailwind-variants'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
  href: string
  color?: 'primary' | 'active' | 'warn'
  size?: 'sm'
  children: ReactNode
}

const nav = tv({
  base: 'rounded-lg p-3 font-medium text-neutral-500 dark:text-white active:scale-95 active:opacity-80',
  variants: {
    color: {
      primary:
        'border border-transparent duration-150 ease-out hover:bg-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800',
      warn: 'border border-transparent hover:text-white  duration-150 ease-out dark:hover:border-rose-500 dark:hover:bg-rose-950 hover:border-rose-300 hover:bg-rose-600',
      active: 'border text-neutral-900 dark:border-neutral-700 bg-neutral-200 border-neutral-300 dark:bg-neutral-800 duration-150 ease-out',
    },
    size: {
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'primary',
  },
})

export default function NavLink({
  className,
  children,
  href,
  title,
  size,
  color,
  ...rest
}: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="relative flex h-max">
      <Link
        {...rest}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={nav({ size, color, className })}
      >
        {children}
      </Link>

      {title && (<div
        className={`${
          color === 'warn' ? 'dark:border-red-500 dark:bg-red-950' : 'dark:border-emerald-500'
        } ${
          isHovered === true && 'translate-x-[0px] opacity-100'
        } pointer-events-none absolute left-[70px] top-[20%] -z-10 translate-x-[-100px] rounded-md border bg-neutral-800 px-3 py-2  text-xs dark:text-white opacity-0 shadow-md dark:shadow-black/10 duration-150 ease-out`}
      >
        {title}
      </div>)}
    </div>
  )
}

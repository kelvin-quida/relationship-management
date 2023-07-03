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
  base: 'rounded-lg p-3 font-medium text-white active:opacity-80',
  variants: {
    color: {
      primary:
        'border border-transparent duration-150 ease-out hover:border-neutral-500 hover:bg-zinc-800',
      warn: 'border border-transparent duration-150 ease-out hover:border-red-500 hover:bg-red-950',
      active: 'border border-neutral-500 bg-neutral-800 duration-150 ease-out',
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

      {isHovered && (
        <div
          className={`${
            color === 'warn'
              ? 'border-red-500 bg-red-950'
              : 'border-emerald-500'
          } pointer-events-none absolute left-[70px] top-[20%] rounded-md border  bg-neutral-800 px-3 py-2 text-xs text-white shadow-md shadow-black/10`}
        >
          {title}
        </div>
      )}
    </div>
  )
}

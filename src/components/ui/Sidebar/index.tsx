'use client'
import {
  ArrowLeftOnRectangleIcon,
  BuildingOfficeIcon,
  RectangleStackIcon,
  UserGroupIcon,
  PhoneIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import NavLink from '../NavLink'
import { ReactNode } from 'react'
import { destroyCookie } from 'nookies'
import Button from '../Button'
import { useTheme } from 'next-themes'

type TNavMenu = {
  name: string
  href: string
  icon: ReactNode
}

const navigation = [
  {
    name: 'Clientes',
    href: '/clients',
    icon: <UserGroupIcon className="h-6 w-6" />,
  },
  {
    name: 'Escritórios',
    href: '/offices',
    icon: <BuildingOfficeIcon className="h-6 w-6" />,
  },
  // {
  //   name: 'Calendário',
  //   href: '/calendar',
  //   icon: <CalendarIcon className="h-6 w-6" />,
  // },
  {
    name: 'Chamadas',
    href: '/calls',
    icon: <PhoneIcon className="h-6 w-6" />,
  },
] as TNavMenu[]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  function handleLogout() {
    const noCookies = destroyCookie(null, 'token')

    if (noCookies) {
      return router.push('/')
    }
  }

  return (
    <>
      <div className="relative z-30 flex h-screen flex-col items-center justify-start gap-4 border-r dark:border-neutral-800 dark:bg-neutral-900 px-3 py-6">
        <RectangleStackIcon className="h-16 w-12 cursor-pointer text-emerald-600 dark:text-emerald-400 duration-300 ease-out hover:scale-110 hover:text-orange-400" />
        <div className="my-2 h-px w-full bg-neutral-300 dark:bg-neutral-800" />
        {navigation.map(({ name, href, icon }, index) => (
          <NavLink
            key={index}
            color={pathname === href ? 'active' : 'primary'}
            size="sm"
            href={href}
            title={name}
            className="relative z-30"
          >
            {icon}
          </NavLink>
        ))}
        <div
          className="flex h-full gap-4 flex-col items-center justify-end"
        >
          <NavLink onClick={handleLogout} title="Sair" color="warn" size="sm" href="#">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </NavLink>
          <NavLink href='#' color='primary' className='h-10 w-10 flex items-center justify-center p-1' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'light' ? <SunIcon className='w-5 h-5'/> : <MoonIcon className='w-5 h-5' />}
          </NavLink>
        </div>
      </div>
    </>
  )
}

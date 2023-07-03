import {
  ArrowLeftOnRectangleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  RectangleStackIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import NavLink from '../NavLink'
import { ReactNode } from 'react'

type TNavMenu = {
  name: string
  href: string
  icon: ReactNode
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <ChartBarIcon className="h-6 w-6" />,
  },
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
  {
    name: 'Calendário',
    href: '/calendar',
    icon: <CalendarIcon className="h-6 w-6" />,
  },
] as TNavMenu[]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-start gap-4 bg-neutral-950 px-3 py-6">
        <RectangleStackIcon className="h-20 w-12 cursor-pointer text-emerald-400 duration-300 ease-out hover:scale-110 hover:text-orange-400" />
        <div className="my-2 h-px w-full bg-neutral-800" />
        {navigation.map(({ name, href, icon }, index) => (
          <NavLink
            key={index}
            color={pathname === href ? 'active' : 'primary'}
            size="sm"
            href={href}
            title={name}
            className="relative"
          >
            {icon}
          </NavLink>
        ))}
        <div className="flex h-full flex-col items-center justify-end">
          <NavLink title="Sair" color="warn" size="sm" href="#">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </NavLink>
        </div>
      </div>
    </>
  )
}

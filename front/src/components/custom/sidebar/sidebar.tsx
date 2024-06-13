'use client'

import {
  ExitIcon,
  RocketIcon,
  GridIcon,
  GearIcon,
  BellIcon,
} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Separator } from '../../ui/separator'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@/context/user-context'

type Option = {
  label: string
  active?: boolean
  icon: React.ReactNode
  path: string
  admin?: boolean
}

export const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useUser()

  const options: Array<Option> = [
    {
      label: 'Dashboard',
      active: pathname.includes('/dashboard'),
      icon: <GridIcon />,
      path: '/dashboard',
      admin: true,
    },
    {
      label: 'Notificações',
      active: pathname.includes('/notificacoes'),
      icon: <BellIcon />,
      path: '/notificacoes',
    },
    {
      label: 'Configurações',
      active: pathname.includes('/configuracoes'),
      icon: <GearIcon />,
      path: '/configuracoes',
      admin: true,
    },
    {
      label: 'Reservas',
      active: pathname.includes('/reserva'),
      icon: <RocketIcon />,
      path: '/reserva',
    },
  ]

  const optionsByRole = options.filter((option) => {
    if (option.admin) {
      return user?.role === 'admin'
    }
    return true
  })

  return (
    <div className="w-[300px] h-screen shadow-lg flex flex-col gap-10 p-5 pb-7">
      <div className="flex flex-col gap-5">
        <div className="text-md font-semibold text-primary">Reserva Rápida</div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {optionsByRole.map((option) => (
          <Button
            key={option.label}
            variant={option.active ? 'sidebarActive' : 'ghost'}
            className="flex items-center justify-start gap-4"
            onClick={() => navigate(option.path)}
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-auto">
        <Separator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer p-2">
              <Avatar>
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-[80%]">
                <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                  {user!.name}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[14vw]" align="center">
            <DropdownMenuLabel className="flex">{user!.name}</DropdownMenuLabel>
            <DropdownMenuLabel className="flex items-center gap-2 text-red-600 cursor-pointer hover:bg-red-100 rounded">
              <ExitIcon />
              Sair
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

'use client'

import { ExitIcon, RocketIcon, GridIcon, GearIcon } from '@radix-ui/react-icons'
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

type Option = {
  label: string
  active?: boolean
  icon: React.ReactNode
  path: string
}

export const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const options: Array<Option> = [
    {
      label: 'Dashboard',
      active: pathname.includes('/dashboard'),
      icon: <GridIcon />,
      path: '/dashboard',
    },
    {
      label: 'Configurações',
      active: pathname.includes('/configuracoes'),
      icon: <GearIcon />,
      path: '/configuracoes',
    },
    {
      label: 'Reservas',
      active: pathname.includes('/reserva'),
      icon: <RocketIcon />,
      path: '/reserva',
    },
  ]

  return (
    <div className="w-[300px] h-screen shadow-lg flex flex-col gap-10 p-5 pb-7">
      <div className="flex flex-col gap-5">
        <div className="text-md font-semibold text-primary">Reserva Rápida</div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {options.map((option) => (
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
                  Julia
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[14vw]" align="center">
            <DropdownMenuLabel className="flex">Meu perfil</DropdownMenuLabel>
            <DropdownMenuLabel className="flex items-center gap-2 text-red-600">
              <ExitIcon />
              Sair
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

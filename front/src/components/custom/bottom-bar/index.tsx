'use client'

import {
  ExitIcon,
  RocketIcon,
  GridIcon,
  GearIcon,
  BellIcon,
  InfoCircledIcon,
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
import { useReadNotifications } from '@/hooks/use-read-notifications'
import { INotification } from '@/models/notification'

type Option = {
  label: string
  active?: boolean
  icon: React.ReactNode
  path: string
  role?: 'admin' | 'user'
  numberOfNotifications?: number
}

export const BottomBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, clearUser } = useUser()
  const readNotifications = useReadNotifications<INotification[]>()

  const options: Array<Option> = [
    {
      label: 'Informações',
      active: pathname.includes('/informacoes'),
      icon: <InfoCircledIcon />,
      path: '/informacoes',
      role: 'user',
    },
    {
      label: 'Reservas',
      active: pathname.includes('/reservas'),
      icon: <GridIcon />,
      path: '/reservas',
      role: 'admin',
    },
    {
      label: 'Notificações',
      active: pathname.includes('/notificacoes'),
      icon: <BellIcon />,
      path: '/notificacoes',
      role: 'admin',
      numberOfNotifications: readNotifications.data?.filter((n) => !n.isRead)
        .length,
    },
    {
      label: 'Configurações',
      active: pathname.includes('/configuracoes'),
      icon: <GearIcon />,
      path: '/configuracoes',
      role: 'admin',
    },
    {
      label: 'Minhas Reservas',
      active: pathname.includes('/minhas-reservas'),
      icon: <RocketIcon />,
      path: '/minhas-reservas',
      role: 'user',
    },
  ]

  const optionsByRole = options.filter((option) => {
    if (option.role === 'admin') {
      return user?.role === 'admin'
    }
    if (option.role === 'user') {
      return user?.role === 'user'
    }
    return true
  })

  return (
    <div className="w-full h-[60px] shadow-lg flex items-center justify-between px-5 fixed bottom-0 bg-white z-50">
      <div className="flex items-center gap-3">
        {optionsByRole.map((option) => (
          <Button
            key={option.label}
            variant={option.active ? 'sidebarActive' : 'ghost'}
            className="flex items-center justify-center gap-2"
            onClick={() => navigate(option.path)}
          >
            {option.numberOfNotifications ? (
              <div className="relative">
                {option.icon}
                {option.numberOfNotifications > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {option.numberOfNotifications}
                  </div>
                )}
              </div>
            ) : (
              option.icon
            )}
            <span className="hidden sm:inline">{option.label}</span>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <Separator orientation="vertical" />
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer p-2">
                <Avatar>
                  <AvatarFallback>{user!.name[0]}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col max-w-[80%]">
                  <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                    {user!.name}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[14vw]" align="center">
              <DropdownMenuLabel className="flex">
                {user!.name}
              </DropdownMenuLabel>
              <DropdownMenuLabel
                onClick={() => clearUser()}
                className="flex items-center gap-2 text-red-600 cursor-pointer hover:bg-red-100 rounded"
              >
                <ExitIcon />
                Sair
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Separator } from '../../ui/separator'

export const Sidebar = () => {
  return (
    <div className="w-[200px] h-screen shadow-lg flex flex-col gap-10 p-5 pb-7">
      <div className="flex flex-col gap-5">
        <div className="text-lg font-bold text-primary">logo</div>
      </div>
      <div className="flex flex-col gap-3 w-full"></div>
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

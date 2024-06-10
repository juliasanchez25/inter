import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  Cross1Icon,
} from '@radix-ui/react-icons'

export function ReservationMenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <DotsHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <span className="flex items-center gap-1">
              Editar <Pencil1Icon />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <span className="flex items-center gap-1 text-red-600">
              Excluir <Cross1Icon />
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

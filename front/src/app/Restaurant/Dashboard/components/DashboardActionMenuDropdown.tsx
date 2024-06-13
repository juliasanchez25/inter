import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DashboardArchiveReservation } from './DashboardArchiveReservation/DashboardArchiveReservation'
export function DashboardActionMenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <DotsHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <DashboardArchiveReservation />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

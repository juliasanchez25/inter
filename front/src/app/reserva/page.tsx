import { PageLayout } from '@/components/custom/page-layout'
import { ReservationModal } from './components/modal/modal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReservationMenuDropdown } from './components/menuDropdown'

const bookings = [
  {
    booking: '1',
    contact: '(17) 98206-6123',
    bookingDay: '2024-06-10',
    bookingTime: '10:00',
    quantity: '5',
  },
  {
    booking: '2',
    contact: '(17) 96206-2323',
    bookingDay: '2024-06-11',
    bookingTime: '14:00',
    quantity: '3',
  },
]

export const Reserva = () => {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Minhas reservas</h2>
        <ReservationModal />
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Reserva</TableHead>
            <TableHead>Dia da reserva</TableHead>
            <TableHead>Horário da reserva</TableHead>
            <TableHead>Quantidade de pessoas</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.booking}>
              <TableCell className="font-medium">{booking.booking}</TableCell>
              <TableCell>{booking.bookingDay}</TableCell>
              <TableCell>{booking.bookingTime}</TableCell>
              <TableCell>{booking.quantity}</TableCell>
              <TableCell>
                <ReservationMenuDropdown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  )
}

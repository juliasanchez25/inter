import { PageLayout } from '@/components/custom/page-layout'
import { CreateNewReservationModal } from './components/CreateNewReservationModal/CreateNewReservationModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReservationMenuDropdown } from './components/ReservationMenuDropdown'
import { useReadReservations } from '@/hooks/use-read-reservations'
import { IReservation } from '@/models/reservation'
import dayjs from 'dayjs'

export const Reservation = () => {
  const readReservations = useReadReservations<IReservation[]>()

  return (
    <PageLayout>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Minhas reservas</h2>
        <CreateNewReservationModal />
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Reserva</TableHead>
            <TableHead>Dia da reserva</TableHead>
            <TableHead>Quantidade de pessoas</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        {readReservations.isLoading && readReservations.isRefetching ? (
          <TableBody>Carregando...</TableBody>
        ) : (
          <TableBody>
            {readReservations.data?.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>
                  {dayjs(reservation.day).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>{reservation.quantity}</TableCell>
                <TableCell>
                  <ReservationMenuDropdown reservation={reservation} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {readReservations.data?.length === 0 && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <p className="text-muted-foreground">
                  Nenhuma reserva encontrada :(
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </PageLayout>
  )
}

import { PageLayout } from '@/components/custom/page-layout'
import { CreateNewReservationModal } from './components/CreateNewReservationModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IReservation } from '@/models/reservation'
import dayjs from 'dayjs'
import { ReservationDatePicker } from './components/ReservationsDatePicker'
import { useState } from 'react'
import { useReadMyReservations } from '@/hooks/use-read-my-reservations'
import { useUser } from '@/context/user-context'
import { EditReservation } from './components/EditReservationModal'
import { DeleteReservation } from './components/DeleteReservationModal'

export const Reservation = () => {
  const { user } = useUser()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const readReservations = useReadMyReservations<IReservation[]>({
    userId: user?.id as number,
  })

  const filterReservationByDate = (
    reservations: IReservation[] | undefined,
  ) => {
    if (!reservations) return []
    if (!date) return reservations
    return reservations.filter((reservation) =>
      dayjs(reservation.day).isSame(date, 'day'),
    )
  }

  return (
    <PageLayout>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Minhas reservas</h2>
          <ReservationDatePicker
            error={readReservations.error?.message}
            value={date}
            setValue={setDate}
          />
        </div>
        <CreateNewReservationModal />
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Reserva</TableHead>
            <TableHead>Dia da reserva</TableHead>
            <TableHead>Quantidade de pessoas</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Excluir</TableHead>
          </TableRow>
        </TableHeader>
        {readReservations.isLoading && readReservations.isRefetching ? (
          <TableBody>Carregando...</TableBody>
        ) : (
          <TableBody>
            {filterReservationByDate(readReservations?.data).map(
              (reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>
                    {dayjs(reservation.day).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{reservation.quantity}</TableCell>
                  <TableCell>
                    <EditReservation reservation={reservation} />
                  </TableCell>
                  <TableCell>
                    <DeleteReservation id={reservation.id} />
                  </TableCell>
                </TableRow>
              ),
            )}
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

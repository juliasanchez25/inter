import { PageLayout } from '@/components/custom/page-layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useReadReservations } from '@/hooks/use-read-reservations'
import { IReservationForAdmin } from '@/models/reservation'
import dayjs from 'dayjs'
import { DashboardDatePicker } from './components/DashboardDatePicker'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export function Dashboard() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(
    dayjs().add(7, 'days').toDate(),
  )

  React.useEffect(() => {
    document.title = 'Reservas'
  }, [])

  const readReservations = useReadReservations<IReservationForAdmin[]>()

  const filterReservationByDate = (
    reservations: IReservationForAdmin[] | undefined,
  ) => {
    if (!reservations) return []
    if (!startDate || !endDate) return reservations
    return reservations
      .filter(
        (reservation) =>
          dayjs(reservation.day).isBetween(startDate, endDate, 'day', '[]') ||
          dayjs(reservation.day).isBetween(endDate, startDate, 'day', '[]'),
      )
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
  }

  return (
    <PageLayout>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Reservas</h2>
        <Separator className="mt-4 mb-4" />
        <div className="flex flex-col md:flex-row md:gap-5 md:items-center">
          <div>
            <label className="block text-xs leading-6 text-gray-600">
              Data inicial
            </label>
            <DashboardDatePicker
              error={readReservations.error?.message}
              value={startDate}
              setValue={setStartDate}
              disabled={{
                after: endDate as Date,
              }}
              bookedDays={readReservations.data?.map(
                (reservation) => new Date(reservation.day),
              )}
            />
          </div>
          <div>
            <label className="block text-xs leading-6 text-gray-600">
              Data final
            </label>
            <DashboardDatePicker
              error={readReservations.error?.message}
              value={endDate}
              setValue={setEndDate}
              disabled={{
                before: startDate as Date,
              }}
              bookedDays={readReservations.data?.map(
                (reservation) => new Date(reservation.day),
              )}
            />
          </div>
        </div>
      </div>
      <Table className="min-w-[500px] md:w-full mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Dia da reserva</TableHead>
            <TableHead>Quantidade de pessoas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[40px] overflow-scroll">
          {readReservations.data &&
            filterReservationByDate(readReservations.data).map(
              (reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.userName}
                  </TableCell>
                  <TableCell>{reservation.phone}</TableCell>
                  <TableCell>
                    {dayjs(reservation.day).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{reservation.quantity}</TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </PageLayout>
  )
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ReservationDatePicker } from '../ReservationsDatePicker'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reservationModalSchema } from './validation'
import { transformNumberToPhone } from '@/utils/masks'
import { useCreateReservation } from '@/hooks/use-create-reservation'
import { queryClient } from '@/main'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Pencil1Icon, ReloadIcon } from '@radix-ui/react-icons'
import { useUser } from '@/context/user-context'
import { useReadReservations } from '@/hooks/use-read-reservations'
import { IConfigurationModel } from '@/models/configuration'
import { IReservation, IReservationForAdmin } from '@/models/reservation'
import { useReadConfiguration } from '@/hooks/use-read-configuration'
import dayjs from 'dayjs'
import { useUpdateReservation } from '@/hooks/use-update-reservation'
import { daysOptions } from '@/app/Restaurant/RestaurantSettings/components/DaysOpen'

type FormData = {
  phone: string
  date: Date | undefined
  peopleQuantity: string
}

type Props = {
  reservation?: IReservation
  edit?: boolean
}

export const ReservationModal = ({ reservation, edit }: Props) => {
  const [numberOfReservations, setNumberOfReservations] = useState(0)
  const [open, setOpen] = useState(false)
  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(reservationModalSchema),
    defaultValues: {
      phone: reservation?.phone || '',
      date: reservation?.day ? new Date(reservation.day) : new Date(),
      peopleQuantity: reservation?.quantity?.toString() || '1',
    },
  })

  const createReservation = useCreateReservation({
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({
        queryKey: ['readMyReservations'],
      })
      queryClient.invalidateQueries({
        queryKey: ['readReservations'],
      })
      setOpen(false)
      toast({
        description: 'Reserva efetuada com sucesso',
        title: 'Sucesso',
        className: 'bg-emerald-500 text-white',
      })
    },
  })

  const updateReservation = useUpdateReservation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['readReservations'],
      })
      queryClient.invalidateQueries({
        queryKey: ['readMyReservations'],
      })
      setOpen(false)
      toast({
        description: 'Reserva editada com sucesso',
        title: 'Sucesso',
        className: 'bg-emerald-500 text-white',
      })
    },
  })

  const submit = (values: FormData) => {
    if (edit && reservation) {
      updateReservation.mutate({
        id: reservation.id,
        day: values.date?.toISOString() as string,
        quantity: values.peopleQuantity,
        phone: transformNumberToPhone(values.phone),
        userId: user!.id,
      })
      return
    }
    createReservation.mutate({
      day: values.date?.toISOString() as string,
      quantity: values.peopleQuantity,
      phone: transformNumberToPhone(values.phone),
      userId: user!.id,
    })
  }

  const readConfiguration = useReadConfiguration<IConfigurationModel[]>()
  const readReservations = useReadReservations<IReservationForAdmin[]>()
  const configuration = readConfiguration.data?.[0]
  const totalReservationsAvailable = configuration?.capacity || 0

  const chooseErrorForQuantity = () => {
    if (numberOfReservations >= totalReservationsAvailable) {
      return 'Nenhuma mesa disponível nessa data'
    }
    if (
      totalReservationsAvailable - numberOfReservations <
      Number(watch('peopleQuantity'))
    ) {
      return 'A quantidade de pessoas selecionada ultrapassa o limite de mesas disponíveis'
    }
    return null
  }

  useEffect(() => {
    if (!readConfiguration.data) return
    if (!readReservations.data) return
    if (watch('date')) {
      const reservationsOfDay = readReservations.data.filter((reservation) =>
        dayjs(reservation.day).isSame(watch('date'), 'day'),
      )
      const quantitySum = reservationsOfDay.reduce(
        (acc, reservation) => acc + reservation.quantity,
        0,
      )
      setNumberOfReservations(quantitySum)
    }
  }, [readReservations.data, readConfiguration.data, watch('date')])

  const disabledDayOfWeek = daysOptions
    .map((day, index) => {
      return configuration?.daysOpen?.includes(day) ? null : index
    })
    .filter((i) => i !== null) as number[]

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <SheetTrigger asChild>
        {edit ? (
          <div className="w-full flex gap-2 items-center cursor-pointer">
            <Pencil1Icon className="hover:text-blue-500" />
          </div>
        ) : (
          <Button>Fazer reserva</Button>
        )}
      </SheetTrigger>
      <SheetContent className="md:max-w-[450px]">
        <form onSubmit={handleSubmit(submit)}>
          <SheetHeader>
            <SheetTitle className="mb-3">Faça sua reserva</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="phone"
                className="col-span-3"
                maxLength={15}
                {...register('phone')}
                placeholder="(99) 99999-9999"
                onChange={(e) => {
                  e.target.value = transformNumberToPhone(e.target.value)
                }}
                error={errors.phone?.message}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="date">Dia da reserva</Label>
              <ReservationDatePicker
                value={getValues('date')}
                setValue={(date) => {
                  setValue('date', date)
                  trigger('date')
                }}
                disabled={{
                  before: new Date(),
                  dayOfWeek: disabledDayOfWeek,
                }}
                error={errors.date?.message}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="peopleQuantity">Mesa para quantos?</Label>
              <Input
                id="peopleQuantity"
                type="number"
                max="20"
                className="col-span-3"
                {...register('peopleQuantity')}
                error={errors.peopleQuantity?.message}
                disabled={numberOfReservations >= totalReservationsAvailable}
              />
            </div>
            <p className="text-red-500 text-xs w-full">
              {chooseErrorForQuantity()}
            </p>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={
                createReservation.isPending || !!chooseErrorForQuantity()
              }
            >
              {createReservation.isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Salvar reserva
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

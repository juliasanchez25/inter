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
import { ReservationDatePicker } from '../ReservationDatePicker'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editReservationModalSchema } from './validation'
import { transformNumberToPhone } from '@/utils/masks'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IReservation } from '@/models/reservation'
import { useUpdateReservation } from '@/hooks/use-update-reservation'
import { useState } from 'react'
import { queryClient } from '@/main'
import { toast } from '@/components/ui/use-toast'

type FormData = {
  phone: string
  date: Date | undefined
  peopleQuantity: string
}

type Params = {
  reservation: IReservation
}

export const EditReservation = ({ reservation }: Params) => {
  const [open, setOpen] = useState(false)

  const updateReservation = useUpdateReservation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['readReservations'],
      })
      setOpen(false)
      toast({
        description: 'Reserva editada com sucesso',
        title: 'Sucesso',
        className: 'bg-emerald-500 text-white',
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(editReservationModalSchema),
    defaultValues: {
      phone: reservation.phone,
      date: new Date(reservation.day),
      peopleQuantity: reservation.quantity,
    },
  })

  const submit = (values: FormData) => {
    updateReservation.mutate({
      id: reservation.id,
      day: values.date?.toISOString() as string,
      quantity: values.peopleQuantity,
      phone: transformNumberToPhone(values.phone),
      userId: 1,
    })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <SheetTrigger asChild>
        <div className="w-full flex gap-2 items-center">
          Editar <Pencil1Icon />
        </div>
      </SheetTrigger>
      <SheetContent className="md:max-w-[450px]">
        <form onSubmit={handleSubmit(submit)}>
          <SheetHeader>
            <SheetTitle className="mb-3">Editar reserva</SheetTitle>
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
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
            <Button
              type="submit"
              onClick={(e) => {
                handleSubmit(submit)(e)
              }}
            >
              Salvar reserva
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

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
import { reservationModalSchema } from './validation'
import { transformNumberToPhone } from '@/utils/masks'
import { useCreateReservation } from '@/hooks/use-create-reservation'
import { queryClient } from '@/main'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'

type FormData = {
  phone: string
  date: Date | undefined
  time: string
  peopleQuantity: string
}

export const CreateNewReservationModal = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(reservationModalSchema),
    defaultValues: {
      phone: '',
      date: new Date(),
      time: '',
      peopleQuantity: '1',
    },
  })

  const createReservation = useCreateReservation({
    onSuccess: () => {
      reset()
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

  const submit = (values: FormData) => {
    createReservation.mutate({
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
        <Button>Fazer reserva</Button>
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
            <Button type="submit" disabled={createReservation.isPending}>
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

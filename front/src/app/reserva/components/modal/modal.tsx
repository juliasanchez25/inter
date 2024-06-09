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
import { ReservationDatePicker } from '../datePicker'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reservationModalSchema } from './validation'
import { transformNumberToPhone } from '@/utils/masks'

type FormData = {
  phone: string
  date: Date | undefined
  time: string
  peopleQuantity: string
}

export const ReservationModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(reservationModalSchema),
    defaultValues: {
      phone: '',
      date: new Date(),
      time: '',
      peopleQuantity: '1',
    },
  })

  const submit = (values: unknown) => {
    console.log('values', values)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Fazer reserva</Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-[500px]">
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
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                type="time"
                className="col-span-3"
                {...register('time')}
                error={errors.time?.message}
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
            <Button type="submit">Salvar reserva</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

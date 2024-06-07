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
import { BookingDatePicker } from './datePicker'

export const Modal = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Fazer reserva</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-3">Faça sua reserva</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" type="phone" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-2">
            <Label htmlFor="date">Dia</Label>
            <BookingDatePicker />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="time">Horário</Label>
            <Input id="time" type="time" className="col-span-3" />
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="peopleQuantity">Mesa para quantos?</Label>
            <Input
              id="peopleQuantity"
              type="number"
              max="20"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar reserva</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

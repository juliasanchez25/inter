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
import { transformNumberToPhone } from '@/utils/masks'
import { OpenDaysBox } from './components/OpenDaysBox'

export const CreateRestaurantSettingsModal = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Criar configurações</Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-[450px]">
        <form>
          <SheetHeader>
            <SheetTitle className="mb-3">
              Configurações do restaurante
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="phone"
                className="col-span-3"
                maxLength={15}
                onChange={(e) => {
                  e.target.value = transformNumberToPhone(e.target.value)
                }}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="openDays">Dias abertos</Label>
              <OpenDaysBox />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" type="text" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
            <Button type="submit">Salvar configurações</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

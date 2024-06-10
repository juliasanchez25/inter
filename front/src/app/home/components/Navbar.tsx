import { Button } from '@/components/ui/button'

export const Navbar = () => {
  return (
    <header className="w-full flex justify-between px-10 py-6 shadow-md">
      <h2 className="self-center text-xl font-bold cursor-pointer">
        Reserva Rápida
      </h2>
      <ul className="flex items-center gap-6">
        <li>
          <Button className="w-36">Entrar</Button>
        </li>
        <li>
          <Button className="w-36" variant="outline">
            Criar conta
          </Button>
        </li>
      </ul>
    </header>
  )
}

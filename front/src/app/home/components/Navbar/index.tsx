import { CountdownTimerIcon } from '@radix-ui/react-icons'

export const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-primary">
      <a href="#" className="flex items-center justify-center">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <CountdownTimerIcon className="w-5 h-5" />
          Reserva Rápida
        </h2>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          href="/login"
          className="text-md text-white font-medium hover:underline underline-offset-4"
        >
          Fazer login
        </a>
        <a
          href="/cadastro"
          className="text-md text-white font-medium hover:underline underline-offset-4"
        >
          Cadastro
        </a>
      </nav>
    </header>
  )
}

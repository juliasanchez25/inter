export const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-primary">
      <a href="#" className="flex items-center justify-center">
        <img
          src="/images/logo.svg"
          alt="Reserva Rápida"
          width={90}
          height={90}
          className="mr-2"
        />
        <span className="sr-only">Reserva Rápida</span>
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

import React from 'react'
import { Navbar } from './components/Navbar'
import { Button } from '@/components/ui/button'

export const Home = () => {
  React.useEffect(() => {
    document.title = 'Início'
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-14">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Faça sua reserva, de forma rápida
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-2xl dark:text-gray-400">
                      Garanta sua mesa com apenas alguns cliques. Simples,
                      rápido e conveniente.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <a href="/cadastro">
                      <Button>Começar agora</Button>
                    </a>
                    <a href="/login">
                      <Button variant={'outline'}>Fazer login</Button>
                    </a>
                  </div>
                </div>
                <img
                  src="/images/main.svg"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
          <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
            <div className="grid gap-1">
              <h3 className="font-semibold">Reserva Rápida</h3>
              <a href="#">Sobre Nós</a>
              <a href="#">Contato</a>
              <a href="#">Cardápio</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Ajuda</h3>
              <a href="#">FAQs</a>
              <a href="#">Suporte ao Cliente</a>
              <a href="#">Como Funciona</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Legal</h3>
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Serviço</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Redes sociais</h3>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
    </>

    // <section style={gradientStyle} className="h-screen" onClick={handleClick}>
    //   <div className="pt-32 flex flex-col items-center justify-center">
    //     <div className="z-50 flex flex-col items-center">
    //       <h1 className="text-5xl font-bold text-white md:text-7xl">
    //         Reserva Rápida
    //       </h1>
    //       <a href="/login">
    //         <button className="mt-8 w-36 h-10 p-2 flex items-center justify-center rounded-md border-solid border-2 border-white text-sm text-white font-semibold cursor-pointer md:text-md z-90 hover:bg-white hover:text-black transition-colors delay-5">
    //           Iniciar
    //         </button>
    //       </a>
    //     </div>
    //     <img
    //       className={`z-0 absolute bottom-0 transition duration-500 ease-in-out transform ${showFirstImage ? 'opacity-100' : 'opacity-0'}`}
    //       src={showFirstImage ? '/carousel-first-image.svg' : ''}
    //       alt=""
    //     />
    //     <img
    //       className={`z-0 absolute bottom-0 transition duration-500 ease-in-out transform ${showFirstImage ? 'opacity-0' : 'opacity-100'}`}
    //       src={showFirstImage ? '' : '/carousel-second-image.svg'}
    //       alt=""
    //     />
    //   </div>
    // </section>
  )
}

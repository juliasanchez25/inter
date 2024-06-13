import React from 'react'
import { Navbar } from './components/Navbar'
import { Button } from '@/components/ui/button'

export const Home = () => {
  React.useEffect(() => {
    document.title = 'Início'
  }, [])
  // const [showFirstImage, setShowFirstImage] = useState(true)
  // const [gradientColors, setGradientColors] = useState(['#F0B25B', '#FF9500'])

  // const handleClick = () => {
  //   setShowFirstImage(!showFirstImage)
  //   setGradientColors(
  //     showFirstImage ? ['#F06235', '#CA0D01'] : ['#F0B25B', '#FF9500'],
  //   )
  // }

  // const gradientStyle = {
  //   backgroundImage: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`,
  // }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
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
                    <a href="#">
                      <Button>Começar agora</Button>
                    </a>
                    <a href="#">
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
          {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Key Features of Our Marketplace
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Discover why our marketplace is the best choice for buying
                    and selling products.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Wide Selection</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Browse through thousands of high-quality products from
                    trusted sellers.
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:underline underline-offset-4 dark:text-gray-50"
                  >
                    Learn More
                  </a>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Secure Transactions</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rest assured that your payments are safe and secure with our
                    advanced security measures.
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:underline underline-offset-4 dark:text-gray-50"
                  >
                    Learn More
                  </a>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Fast Shipping</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get your orders delivered quickly with our reliable shipping
                    partners.
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:underline underline-offset-4 dark:text-gray-50"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    What Our Customers Say
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Hear from our satisfied customers about their experience
                    with our marketplace.
                  </p>
                </div>
                <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-start">
                      <div className="ml-4 space-y-1">
                        <h4 className="text-lg font-semibold">John Doe</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Satisfied Customer
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      "I've been using this marketplace for months and I'm\n
                      consistently impressed by the wide selection of products
                      and\n the reliable shipping. Highly recommended!"
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-start">
                      <div className="ml-4 space-y-1">
                        <h4 className="text-lg font-semibold">Sarah Miller</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Satisfied Customer
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      `&quot;I&apos;ve had a great experience buying from this
                      marketplace.\n The products are high-quality, the prices
                      are fair, and the\n customer service is top-notch. I'll
                      definitely be a repeat\n customer.`&quot;
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-start">
                      <div className="ml-4 space-y-1">
                        <h4 className="text-lg font-semibold">
                          Michael Johnson
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Satisfied Customer
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      "I've been using this marketplace for a while now and
                      I'm\n always impressed by the wide selection of products
                      and the\n easy-to-use platform. The checkout process is a
                      breeze and\n the shipping is fast. Highly recommended!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </main>
        <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
          <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
            <div className="grid gap-1">
              <h3 className="font-semibold">Marketplace</h3>
              <a href="#">Explore</a>
              <a href="#">Sell</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Help</h3>
              <a href="#">FAQs</a>
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
              <a href="#">Payments</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Legal</h3>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Social</h3>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">aedIn</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Download</h3>
              <a href="#">iOS App</a>
              <a href="#">Android App</a>
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

import React from 'react'
import { Navbar } from './components/Navbar'
import { Input } from '@/components/ui/input'
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
    <main className="w-screen h-screen relative text-center">
      <Navbar />
    </main>

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

import { useState } from 'react'

export const Home = () => {
  const [showFirstImage, setShowFirstImage] = useState(true)
  const [gradientColors, setGradientColors] = useState(['#F0B25B', '#FF9500'])

  const handleClick = () => {
    setShowFirstImage(!showFirstImage)
    setGradientColors(
      showFirstImage ? ['#F06235', '#CA0D01'] : ['#F0B25B', '#FF9500'],
    )
  }

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`,
  }

  return (
    <section style={gradientStyle} className="h-screen" onClick={handleClick}>
      <div className="pt-32 flex flex-col items-center justify-center md:pt-12">
        <h1 className="text-5xl italic font-semibold text-white md:text-7xl">
          hellow
        </h1>
        <div className="mt-5 px-2 flex flex-col items-center gap-4 py-4 text-white text-center z-10">
          <h2 className="text-2xl font-bold md:text-4xl">
            Faça sua reserva de forma rápida
          </h2>
          <p className="text-md md:text-xl">
            Descubra o sabor da vida em cada reserva, cada prato é uma jornada e
            cada mesa uma história.
          </p>
          <a href="/login">
            <button className="w-48 h-10 p-2 flex items-center justify-center rounded-md border-solid border-2 border-white text-sm font-semibold cursor-pointer md:text-md">
              Reserve aqui
            </button>
          </a>
        </div>
        <img
          className={`absolute bottom-0 transition duration-500 ease-in-out transform ${showFirstImage ? 'opacity-100' : 'opacity-0'}`}
          src={showFirstImage ? '/public/carousel-first-image.svg' : ''}
          alt=""
        />
        <img
          className={`absolute bottom-0 transition duration-500 ease-in-out transform ${showFirstImage ? 'opacity-0' : 'opacity-100'}`}
          src={showFirstImage ? '' : '/public/carousel-second-image.svg'}
          alt=""
        />
      </div>
    </section>
  )
}

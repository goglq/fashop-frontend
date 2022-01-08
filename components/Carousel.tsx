import { useEffect, useState } from 'react'

const CarouselData = [
  {
    image:
      'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  },
]

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)

  useEffect(() => {
    const slideIntervalId = setInterval(() => {
      if (paused === false) {
        let newSlide =
          currentSlide === CarouselData.length - 1 ? 0 : currentSlide + 1
        setCurrentSlide(newSlide)
      }
    }, 3000)

    return () => clearInterval(slideIntervalId)
  }, [currentSlide, paused])

  const nextSlide = () => {
    let newSlide =
      currentSlide === CarouselData.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(newSlide)
  }

  const prevSlide = () => {
    let newSlide =
      currentSlide === 0 ? CarouselData.length - 1 : currentSlide - 1
    setCurrentSlide(newSlide)
  }

  return (
    <div className="w-full h-96 flex justify-center overflow-hidden relative">
      <div className="w-10/12 flex overflow-hidden relative">
        {CarouselData.map((slide, index) => {
          return (
            <img
              src={slide.image}
              alt="This is a carousel slide"
              key={index}
              className={
                index === currentSlide
                  ? 'block w-full h-auto object-cover'
                  : 'hidden'
              }
              onMouseEnter={() => {
                setPaused(true)
              }}
              onMouseLeave={() => {
                setPaused(false)
              }}
            />
          )
        })}
      </div>

      <div className="absolute w-full flex justify-center bottom-0">
        {CarouselData.map((element, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? 'h-4 w-4 bg-pink-400 rounded-full mx-2 mb-2 cursor-pointer'
                  : 'h-4 w-4 bg-fashop-primary rounded-full mx-2 mb-2 cursor-pointer'
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index)
              }}
            ></div>
          )
        })}
      </div>

      <div
        className="absolute left-0 flex justify-center items-center text-3xl inset-y-1/2 text-white cursor-pointer w-16 h-16 transform -translate-y-10"
        onClick={prevSlide}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
          transform="scale(-1,1)"
        >
          <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
        </svg>
      </div>

      <div
        className="absolute right-0 flex justify-center items-center text-3xl inset-y-1/2 text-white cursor-pointer w-16 h-16 transform -translate-y-10 -scale-y-2"
        onClick={nextSlide}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
        </svg>
      </div>
    </div>
  )
}

export default Carousel

import { ReactNode } from 'react'
import Carousel from './Carousel'
import Header from './Header'

const IndexLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex justify-center bg-fashop-1">
        <Carousel />
      </div>
      <div className="container mx-auto mt-10">{children}</div>
    </div>
  )
}

export default IndexLayout

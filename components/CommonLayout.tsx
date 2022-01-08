import { ReactNode } from 'react'
import Header from './Header'

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="container mx-auto">{children}</div>
    </div>
  )
}

export default CommonLayout

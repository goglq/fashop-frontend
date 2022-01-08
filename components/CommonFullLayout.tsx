import { ReactNode } from 'react'
import Header from './Header'

const CommonFullLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default CommonFullLayout

import { ReactNode } from 'react'

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto">{children}</div>
}

export default CommonLayout

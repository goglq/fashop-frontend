import Link from 'next/link'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <Link href="/">
        <a className="rounded-md p-2 bg-fashop-2 text-white font-medium absolute top-2 left-2">
          На Главную
        </a>
      </Link>
      <div className="container mx-auto">{children}</div>
    </div>
  )
}

export default AuthLayout

import { useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { AllCatagoriesQuery } from '../graphql/queries'

const Header = () => {
  const user = useUser()
  const graphql = useQuery(AllCatagoriesQuery)

  if (user.isLoading || graphql.loading) return <p>Loading...</p>

  if (user.error || graphql.error)
    return (
      <p>
        ERROR GRAPHQL: {graphql.error?.message} ERROR USER:{' '}
        {user.error?.message}
      </p>
    )

  return (
    <div className="grid px-5 grid-cols-8 grid-rows-1 items-center h-20">
      <div className="flex mt-5 h-full items-start col-span-1">
        <Link href="/">
          <a className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fashop-2 to-fashop-4">
            fashop
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex w-32 py-3 px-5 rounded-full bg-fashop-2 text-white font-medium">
          hello
        </div>
      </div>
      <div className="col-start-3 col-span-4">
        <div className="flex items-center justify-center p-1 border-2 border-fashop-3 rounded-full bg-white">
          <input
            className="flex-1 ml-4 outline-none font-medium"
            type="text"
            placeholder="Search"
          />
          <Link href="/search">
            <a className="px-10 py-2 rounded-full bg-fashop-3 text-white font-medium">
              Search
            </a>
          </Link>
        </div>
      </div>
      <div className="col-start-8 flex justify-end">
        {user.user ? (
          <div className="flex space-x-5">
            <Link href="/profile">
              <a className="flex justify-center items-center h-12 w-12 rounded-full bg-fashop-4">
                P
              </a>
            </Link>
            <Link href="/cart">
              <a className="flex justify-center items-center h-12 w-12 rounded-full bg-fashop-4">
                Cart
              </a>
            </Link>
          </div>
        ) : (
          <a
            className="px-5 py-2 rounded-full bg-fashop-3 text-fashop-primary font-medium"
            href="/api/auth/login"
          >
            login
          </a>
        )}
      </div>
    </div>
  )
}

export default Header

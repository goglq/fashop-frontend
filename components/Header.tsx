import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAppSelector } from '../app/hooks'
import LoggedInHamburger from './LoggedInHamburger'
import LoggedInMenu from './LoggedInMenu'

const Header = () => {
  const router = useRouter()

  const { search } = router.query

  const [searchText, setSearchText] = useState(search)

  const isAuth = useAppSelector((_) => _.user.isAuth)

  return (
    <div className="grid px-5 grid-cols-8 grid-rows-1 items-center h-20">
      <div className="flex mt-5 h-full items-start col-span-1">
        <Link href="/">
          <a className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fashop-2 to-fashop-4">
            fashop
          </a>
        </Link>
      </div>
      <div className="flex items-center"></div>
      <div className="col-start-3 col-span-4">
        <div className="flex p-1 items-center justify-center border-2 border-fashop-3 rounded-full bg-white">
          <input
            className="flex-1 py-2 h-full ml-4 outline-none font-medium"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
          <Link href={{ pathname: '/search', query: { search: searchText } }}>
            <a className="px-10 py-2 rounded-full bg-fashop-3 text-white font-medium transition transform hover:scale-103 hover:bg-fashop-2 duration-300 ease-in-out">
              Search
            </a>
          </Link>
        </div>
      </div>
      <div className="col-start-7 col-span-8">
        {isAuth ? (
          <LoggedInHamburger />
        ) : (
          <div className="flex justify-end space-x-2">
            <Link href="/auth/login">
              <a className="px-5 py-2 text-fashop-1 font-medium">Войти</a>
            </Link>
            <Link href="/auth/registration">
              <a className="px-5 py-2 rounded-full bg-fashop-1 text-fashop-primary font-medium">
                Зарегистрироваться
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

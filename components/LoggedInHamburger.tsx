import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../app/slices/userSlice'
import { LogoutMutation } from '../graphql/auth'
import Loading from './Loading'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const LoggedInHamburger = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [logoutFunction, { data, loading, error }] = useMutation(LogoutMutation)

  useEffect(() => {
    if (data !== undefined) {
      dispatch(logout())
      router.push('/')
    }
  }, [data, router])

  if (loading)
    return (
      <div className="flex justify-end">
        <Loading />
      </div>
    )

  if (error) return <div>{error.message}</div>

  return (
    <div className="flex justify-between items-center w-full px-3">
      <Link href="/cart">
        <a className="flex justify-center items-center w-12 h-12 rounded-full bg-fashop-2 text-white font-medium">
          <FontAwesomeIcon icon={faCartShopping} />
        </a>
      </Link>
      <div className="space-x-2">
        <div className="group relative font-medium">
          <div className="flex justify-center w-32 px-5 py-2 rounded-lg bg-fashop-2 text-white cursor-pointer transition-width duration-75 group-hover:rounded-none group-hover:rounded-tl-lg group-hover:rounded-tr-lg group-hover:w-32">
            Меню
          </div>
          <div className="text-right w-32 absolute  top-10 right-0 flex flex-col p-1 rounded-br-md rounded-bl-md bg-fashop-2 text-black space-y-2 transform origin-top transition duration-75 scale-0 group-hover:scale-100">
            <Link href="/profile">
              <a className="pl-5 pr-2 py-1 bg-white rounded-md">Профиль</a>
            </Link>
            <Link href="/cart">
              <a className="pl-5 pr-2 py-1 bg-white rounded-md">Корзина</a>
            </Link>
            <Link href="/">
              <a className="pl-5 pr-2 py-1 bg-white rounded-md">Избранное</a>
            </Link>
            <button
              className="pl-5 pr-2 py-1 bg-white text-right font-medium rounded-md"
              onClick={(e) => {
                e.preventDefault()
                logoutFunction()
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoggedInHamburger

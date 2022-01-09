import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../app/slices/userSlice'
import { LogoutMutation } from '../graphql/auth'
import Loading from './Loading'

const LoggedInMenu = () => {
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
          C
        </a>
      </Link>
      <div className="space-x-2">
        <Link href="/profile">
          <a className="px-5 py-2 rounded-full bg-fashop-2 text-white font-medium">
            Профиль
          </a>
        </Link>
        <button
          className="px-5 py-2 rounded-full bg-fashop-2 text-white font-medium"
          onClick={(e) => {
            e.preventDefault()
            logoutFunction()
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  )
}

export default LoggedInMenu

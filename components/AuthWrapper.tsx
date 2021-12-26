import * as React from 'react'
import { useAppDispatch } from '../app/hooks'
import { checkAuthAsync } from '../app/slices/userSlice'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthAsync())
    }
  }, [])

  return <>{children}</>
}

export default AuthWrapper

import { ApolloError, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { LoginMutation } from '../../graphql/auth'
import { login } from '../../app/slices/userSlice'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'
const LoginPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const [loginFunction, { data, loading, error }] = useMutation(LoginMutation)

  useEffect(() => {
    console.log('data, router, dispatch')
    if (data !== undefined) {
      dispatch(login(data.loginUser.tokens.accessToken))
      router.back()
    }
  }, [data, router, dispatch])

  // useEffect(() => {
  //   console.log('errors, error')
  //   if (error !== undefined) {
  //     console.log(error)
  //     const tmpErrors: string[] = error.graphQLErrors.map(
  //       (graphQLError) => graphQLError.extensions.message
  //     )
  //     setErrors(tmpErrors)
  //   }
  // }, [errors, error])

  useEffect(() => {
    console.log('using effect')
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action="login"
        className="flex flex-col p-5 rounded-xl bg-gray-200 space-y-5"
        onSubmit={(e) => {
          e.preventDefault()
          loginFunction({
            variables: { email: email, password: password },
          })
        }}
      >
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="email"
            className="px-2 py-1 rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="px-2 py-1 rounded-md outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            className="py-2 rounded-md bg-fashop-1 text-white"
            type="submit"
          >
            Логин
          </button>
          {error && (
            <div className="rounded-md bg-red-500 text-white font-medium text-center">
              {error?.graphQLErrors[0].extensions.message}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { RegisterMutation } from '../../graphql/auth'

const RegistrationPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [registerFunction, { data, loading, error }] =
    useMutation(RegisterMutation)

  useEffect(() => {
    if (data !== undefined) {
      router.back()
    }
  }, [data, router])

  if (loading)
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )

  if (error) return `Submission error! ${error.message}`

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action="login"
        className="flex flex-col p-5 rounded-xl bg-gray-200 space-y-5"
        onSubmit={(e) => {
          e.preventDefault()

          if (password !== repeatPassword) return

          registerFunction({
            variables: {
              email: email,
              password: password,
            },
          })

          router.back()
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
            placeholder="пароль"
            className="px-2 py-1 rounded-md outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            className="px-2 py-1 rounded-md outline-none"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.currentTarget.value)}
          />
        </div>
        <button
          className="py-2 rounded-md bg-fashop-1 text-white"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}

export default RegistrationPage

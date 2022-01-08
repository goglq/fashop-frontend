import Link from 'next/link'

const AuthMenu = () => {
  return (
    <div className="space-x-2">
      <Link href="/auth/login">
        <a className="px-5 py-2 text-fashop-1 font-medium">Войти</a>
      </Link>
      <Link href="/auth/registration">
        <a className="px-5 py-2 rounded-full bg-fashop-1 text-fashop-primary font-medium">
          Зарегистрироваться
        </a>
      </Link>
    </div>
  )
}

export default AuthMenu

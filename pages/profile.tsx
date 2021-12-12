//import { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return user ? (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 flex p-5 rounded-lg bg-fashop-4">
          <img className="" src={`${user.picture}`} alt="" />
          <h1 className="text-xl font-bold">{user.name}</h1>
        </div>
        <div className="rounded-lg p-5 bg-fashop-2"></div>
      </div>
    </div>
  ) : (
    <p>NOT LOGGED IN</p>
  )
}

export default ProfilePage

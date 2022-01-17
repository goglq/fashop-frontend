import { useQuery } from '@apollo/client'
import CommonFullLayout from '../components/CommonFullLayout'
import { GetSelf } from '../graphql/auth'

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GetSelf)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <div className="grid grid-cols-2 gap-5 h-rel-screen mt-5 px-5">
      <div className="rounded-xl bg-gray-100 p-5">
        <div>
          <p>Почта</p>
          <p>{data.self.email}</p>
          <span>{data.self.isEmailVerified}</span>
        </div>
        <div></div>
      </div>
      <div className="rounded-xl bg-gray-100 p-5"></div>
    </div>
  )
}

ProfilePage.PageLayout = CommonFullLayout

export default ProfilePage

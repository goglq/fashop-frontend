import { useQuery } from '@apollo/client'
import CommonFullLayout from '../components/CommonFullLayout'
import { GetSelf } from '../graphql/auth'

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GetSelf)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <div className="grid grid-cols-2 gap-5 h-rel-screen mt-5 px-5">
      <div className="rounded-xl bg-gray-100">
        <h2>{data.self.email}</h2>
      </div>
      <div className="rounded-xl bg-gray-100"></div>
    </div>
  )
}

ProfilePage.PageLayout = CommonFullLayout

export default ProfilePage

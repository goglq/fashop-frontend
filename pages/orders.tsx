import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import CommonLayout from '../components/CommonLayout'
import Loading from '../components/Loading'
import OrderDto from '../dtos/OrderDto'
import { GetUserOrdersQuery } from '../graphql/order'

const OrdersPage = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GetUserOrdersQuery)

  const isAuth = useAppSelector((state) => state.user.isAuth)

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [router, isAuth])

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    )

  if (error) return <div>error</div>

  return (
    <div className="flex flex-col space-y-3 mt-5">
      <h2 className="text-3xl font-medium">Ваши заказы</h2>
      <div className="flex flex-col space-y-3">
        {data &&
          data.userOrders.map((userOrder: OrderDto) => (
            <div
              key={userOrder.id}
              className="grid grid-cols-3 h-24 rounded-md text-white font-medium bg-fashop-2 px-5 py-2 overflow-hidden"
            >
              <div className="flex items-center text-xl">{userOrder.id}</div>
              <div className="flex items-center">{`${userOrder.city}, улица ${
                userOrder.street
              } ${userOrder.building && `дом ${userOrder.building}`} ${
                userOrder.section && `строение ${userOrder.section}`
              } ${userOrder.housing && `корпус ${userOrder.housing}`}, ${
                userOrder.postIndex
              }`}</div>
              <div className="flex justify-end items-center space-x-5">
                <div className="text-2xl">{userOrder.status.name}</div>
                <div className="flex flex-end text-3xl">
                  {userOrder.totalPrice} &#8381;
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

OrdersPage.PageLayout = CommonLayout

export default OrdersPage

import { useMutation, useQuery } from '@apollo/client'
import CommonLayout from '../components/CommonLayout'
import CartDto from '../dtos/CartDto'
import { AddOrderMutation } from '../graphql/order'
import { GetUserCartsQuery } from '../graphql/cart'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '../app/hooks'
import Loading from '../components/Loading'

const OrderPage = () => {
  const router = useRouter()

  const [city, setCity] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [building, setBuilding] = useState<string>('')
  const [section, setSection] = useState<string>('')
  const [housing, setHousing] = useState<string>('')
  const [postIndex, setPostIndex] = useState<string>('')

  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')

  const cartQuery = useQuery(GetUserCartsQuery)

  const [orderFunction, { data, loading, error }] = useMutation(
    AddOrderMutation,
    {
      onError: (err) => {
        console.log(err)
      },
    }
  )

  const isAuth = useAppSelector((state) => state.user.isAuth)

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [router, isAuth])

  useEffect(() => {
    if (data) {
      router.push('/orders')
    }
  }, [data, router])

  if (loading)
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5 h-rel-screen mt-5">
      <div className="row-span-2 rounded-xl bg-fashop-3">
        {cartQuery.data && (
          <form
            action="order"
            className="flex flex-col justify-between h-full p-5"
            onSubmit={(e) => {
              e.preventDefault()
              orderFunction({
                variables: {
                  city: city,
                  street: street,
                  building: building,
                  section: section,
                  housing: housing,
                  postIndex: postIndex,
                  name: name,
                  surname: surname,
                },
              })
            }}
          >
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="ml-2 text-2xl text-white">Адрес</label>
                <div className="space-y-2">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Город"
                    className="w-full p-2 rounded-md outline-none"
                  />
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.currentTarget.value)}
                    type="text"
                    placeholder="Улица"
                    className="w-full p-2 rounded-md outline-none"
                  />
                  <div className="grid grid-cols-3 grid-row-2 gap-2">
                    <input
                      value={building}
                      onChange={(e) => setBuilding(e.currentTarget.value)}
                      type="text"
                      placeholder="Дом"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      value={section}
                      onChange={(e) => setSection(e.currentTarget.value)}
                      type="text"
                      placeholder="Строение"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      value={housing}
                      onChange={(e) => setHousing(e.currentTarget.value)}
                      type="text"
                      placeholder="Корпус"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      value={postIndex}
                      onChange={(e) => setPostIndex(e.currentTarget.value)}
                      type="text"
                      placeholder="Почтовый индекс"
                      className="w-full p-2 rounded-md outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="ml-2 text-2xl text-white">Получатель</label>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      value={surname}
                      onChange={(e) => setSurname(e.currentTarget.value)}
                      type="text"
                      placeholder="Фамилия"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      type="text"
                      placeholder="Имя"
                      className="w-full p-2 rounded-md outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch space-y-2">
              {error && (
                <div className="flex justify-center items-center rounded-md py-2 bg-red-500 text-white font-medium">
                  {error.message}
                </div>
              )}
              <button className="flex justify-center items-center py-2 rounded-md bg-fashop-1 text-white font-medium">
                Заказать
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="flex justify-center items-center bg-fashop-4 rounded-xl p-5 cursor-default text-lg font-medium">
        Заглушка для оплаты
      </div>
      <div className="row-span-full rounded-xl bg-fashop-4 p-5 cursor-default">
        <h2 className="text-2xl text-white">Заказ</h2>
        {cartQuery.loading && <div>loading...</div>}
        {cartQuery.error && !cartQuery.loading && (
          <div>{cartQuery.error.message}</div>
        )}
        {cartQuery.data && (
          <div className="space-y-2 mt-5">
            {cartQuery.data.userCarts.map((cart: CartDto) => (
              <div
                key={cart.id}
                className="flex justify-between px-4 py-2 rounded-md bg-white"
              >
                <div>{cart.product.name}</div>
                <div>{cart.product.price}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

OrderPage.PageLayout = CommonLayout

export default OrderPage

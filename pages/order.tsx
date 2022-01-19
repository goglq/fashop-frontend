import { useMutation, useQuery } from '@apollo/client'
import CommonLayout from '../components/CommonLayout'
import CartDto from '../dtos/CartDto'
import { AddOrderMutation } from '../graphql/order'
import { GetUserCartsQuery } from '../graphql/cart'

type Props = {
  userCarts: CartDto[]
}

const OrderPage = ({ userCarts }: Props) => {
  const cartQuery = useQuery(GetUserCartsQuery)

  const [orderFunction, { data, loading, error }] =
    useMutation(AddOrderMutation)

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5 h-rel-screen mt-5">
      <div className="row-span-2 rounded-xl bg-fashop-3">
        {cartQuery.data && (
          <form
            action="order"
            className="flex flex-col justify-between h-full p-5"
            onSubmit={(e) => {
              e.preventDefault()
              orderFunction()
            }}
          >
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="ml-2 text-2xl text-white">Адрес</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Город"
                    className="w-full p-2 rounded-md outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Улица"
                    className="w-full p-2 rounded-md outline-none"
                  />
                  <div className="grid grid-cols-3 grid-row-2 gap-2">
                    <input
                      type="text"
                      placeholder="Дом"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Строение"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Корпус"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
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
                      type="text"
                      placeholder="Фамилия"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Имя"
                      className="w-full p-2 rounded-md outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Отчество"
                      className="w-full p-2 rounded-md outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="flex justify-center items-center py-2 rounded-md bg-fashop-1 text-white font-medium">
              Заказать
            </button>
          </form>
        )}
      </div>
      <div className="bg-fashop-4 rounded-xl p-5 cursor-default">
        Данные для оплаты
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

import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setCarts } from '../app/slices/cartSlice'
import CartCard from '../components/CartCard'
import CommonFullLayout from '../components/CommonFullLayout'
import Loading from '../components/Loading'
import CartDto from '../dtos/CartDto'
import { GetUserCartsQuery } from '../graphql/cart'

const CartPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const carts = useAppSelector((state) => state.cart.carts)

  const { data, loading, error, refetch } = useQuery(GetUserCartsQuery)

  const isAuth = useAppSelector((state) => state.user.isAuth)

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [router, isAuth])

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setCarts(data.userCarts))
    }
  }, [data, dispatch])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5 h-rel-screen">
        <div className="flex flex-col col-span-2 flex p-5 rounded-lg bg-fashop-3 space-y-5">
          <p className="text-white text-3xl">Товары</p>
          <div className="w-full h-full space-y-3">
            {loading && (
              <div className="flex justify-center items-center h-full">
                <Loading />
              </div>
            )}
            {error && !loading && <div>{error.message}</div>}
            {carts &&
              carts.map((userCart: CartDto) => (
                <CartCard key={userCart.id} cart={userCart} />
              ))}
          </div>
        </div>
        <div className="flex flex-col rounded-lg p-5 bg-fashop-3 space-y-5">
          <p className="text-white text-3xl">Действия</p>
          <div className="flex flex-col space-y-3">
            <Link href="/order">
              <a className="flex justify-center items-center py-2 rounded-lg bg-fashop-1 text-lg font-medium text-white">
                Оформить заказ
              </a>
            </Link>
            <button className="py-2 rounded-lg bg-red-700 text-lg font-medium text-white">
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

CartPage.PageLayout = CommonFullLayout

export default CartPage

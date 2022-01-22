import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setCarts } from '../app/slices/cartSlice'
import CartDto from '../dtos/CartDto'
import { DeleteCartMutation } from '../graphql/cart'
import CartCounter from './CartCounter'

type Props = {
  cart: CartDto
}

const CartCard = ({ cart }: Props) => {
  const dispatch = useAppDispatch()
  const carts = useAppSelector((state) => state.cart.carts)

  const [DeleteCartFunction, { data, loading, error }] =
    useMutation(DeleteCartMutation)

  useEffect(() => {
    if (data !== undefined && carts !== undefined) {
      console.log('useEffect CartCard')
      dispatch(
        setCarts(
          carts.filter(
            (i) => parseInt(i.id) !== parseInt(data.deleteCart.cartId)
          )
        )
      )
    }
  }, [data, carts])

  return (
    <div className="grid grid-cols-3 w-full rounded-lg bg-white">
      <div className="flex items-center">
        <img
          className="w-20 h-20 object-contain p-1 rounded-lg"
          src={cart.product.productImages[0].url}
          alt=""
        />
        <p className="text-2xl cursor-default">{cart.product.name}</p>
      </div>
      <div className="flex justify-center items-center">
        {/* <CartCounter cart={cart} /> */}
        <span className="text-2xl">Количество: {cart.count}</span>
      </div>
      <div className="flex justify-end items-center pr-5 space-x-10">
        <p className="text-3xl mr-10 cursor-default">${cart.product.price}</p>
        <button
          className="px-5 py-2 rounded-md bg-red-400 text-3xl text-white font-bold"
          onClick={(e) => {
            DeleteCartFunction({ variables: { id: cart.id } })
          }}
        >
          &#10005;
        </button>
      </div>
    </div>
  )
}

export default CartCard

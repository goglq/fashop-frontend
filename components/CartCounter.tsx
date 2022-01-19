import CartDto from '../dtos/CartDto'

type Props = {
  cart: CartDto
}

const CartCounter = ({ cart }: Props) => {
  return (
    <div className="flex items-center space-x-3 text-medium text-xl">
      <button className="flex justify-center items-center w-10 h-10 rounded-md bg-red-200">
        -
      </button>
      <div className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-md cursor-default">
        <span className="text-xl">{cart.count}</span>
      </div>
      <button className="flex justify-center items-center w-10 h-10 rounded-md bg-green-200">
        +
      </button>
    </div>
  )
}

export default CartCounter

const CartPage = () => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 flex p-5 rounded-lg bg-fashop-4">
          <p className="text-white text-3xl">Cart</p>
        </div>
        <div className="rounded-lg p-5 bg-fashop-2">
          <p className="text-white text-3xl">Actions</p>
        </div>
      </div>
    </div>
  )
}

export default CartPage

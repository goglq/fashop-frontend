import CommonFullLayout from '../components/CommonFullLayout'

const CartPage = () => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5 h-rel-screen">
        <div className="flex flex-col col-span-2 flex p-5 rounded-lg bg-fashop-3 space-y-5">
          <p className="text-white text-3xl">Товары</p>
          <div className="w-full space-y-3">
            <div className="w-full rounded-lg bg-white">
              <img
                className="w-20 h-20 object-contain p-1 rounded-lg"
                src="https://via.placeholder.com/600x420"
                alt=""
              />
            </div>
            <div className="w-full rounded-lg bg-white">
              <img
                className="w-20 h-20 object-contain p-1 rounded-lg"
                src="https://via.placeholder.com/400x620"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg p-5 bg-fashop-3 space-y-5">
          <p className="text-white text-3xl">Действия</p>
          <div className="flex flex-col space-y-3">
            <button className="py-2 rounded-lg bg-fashop-1 text-lg font-medium text-white">
              Оформить заказ
            </button>
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

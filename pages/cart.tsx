import { useUser } from '@auth0/nextjs-auth0'

const CartPage = () => {
  const user = useUser()

  if (user.isLoading) return <div>Loading...</div>
  if (user.error) return <div>{user.error.message}</div>

  return user ? (
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
  ) : (
    <p>NOT LOGGED IN</p>
  )
}

export default CartPage

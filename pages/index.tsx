import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import IndexLayout from '../components/IndexLayout'
import ProductList from '../components/ProductList'
import { AllProductsQuery } from '../graphql/queries'
import ProductCard from '../components/ProductCard'
import LargeCommercialCard from '../components/LargeCommercialCard'
import BrandCard from '../components/BrandCard'

interface Tokens {
  accessToken: string
  refreshToken: string
}

interface UserInput {
  email: string
  password: string
}

const loginMutation = gql`
  mutation ($input: LoginUserInput) {
    loginUser(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`

const Home = () => {
  //const { data, error, loading } = useQuery(AllProductsQuery)

  const [products, setProducts] = useState(
    Array.from(Array(21).keys()).map((i) => ({ id: i, name: 'product' }))
  )

  const [brands, setBrands] = useState(
    Array.from(Array(21).keys()).map((i) => ({ id: i, name: 'brand' }))
  )

  // const [loginUser] = useMutation<{ tokens: Tokens }, { input: UserInput }>(
  //   loginMutation
  // )

  // useEffect(() => {
  //   loginUser({
  //     variables: {
  //       input: { email: 'goglqbmo@gmail.com', password: 'qwerty123' },
  //     },
  //   }).then((res) => {
  //     console.log(res)
  //     localStorage.setItem(
  //       'token',
  //       res.data?.loginUser?.tokens?.accessToken as string
  //     )

  //     console.log(localStorage.getItem('token'))
  //   })
  // }, [])

  // if (loading) return <p>Loading...</p>

  // if (error) return <p>ERROR: {error.message}</p>

  return (
    <div>
      <div className="space-y-10 pb-10">
        <div className="space-y-2">
          <span className="text-2xl font-medium">Products</span>
          <ProductList products={products} />
        </div>
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 h-120 md:h-64">
          <LargeCommercialCard img="" />
          <LargeCommercialCard img="" />
        </div>
        <div className="space-y-2">
          <span className="text-2xl font-medium">Возможно вам понравится</span>
          <div className="grid grid-rows-3 grid-cols-7 gap-7">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 h-120 md:h-64">
          <LargeCommercialCard img="" />
          <LargeCommercialCard img="" />
        </div>
        <div className="space-y-5">
          <span className="text-2xl font-medium">Бренды</span>
          <div className="grid grid-cols-7 gap-8">
            {brands.map((b) => (
              <BrandCard key={b.id} img="https://via.placeholder.com/200x100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Home.PageLayout = IndexLayout

export default Home

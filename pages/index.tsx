import { useQuery } from '@apollo/client'
import IndexLayout from '../components/IndexLayout'
import ProductList from '../components/ProductList'
import { AllProductsQuery } from '../graphql/queries'

const Home = () => {
  const { data, error, loading } = useQuery(AllProductsQuery)

  if (loading) return <p>Loading...</p>

  if (error) return <p>ERROR: {error.message}</p>

  return (
    <div>
      <div className="space-y-3">
        <span className="text-2xl font-medium">Products</span>
        <ProductList products={data.products} />
      </div>
    </div>
  )
}

Home.PageLayout = IndexLayout

export default Home

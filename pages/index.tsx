import { gql, OperationVariables, QueryResult, useQuery } from '@apollo/client'
import { GetStaticProps } from 'next'
import IndexLayout from '../components/IndexLayout'
import ProductList from '../components/ProductList'
import { ProductDto } from '../dtos/ProductDto'
import { AllProductsQuery } from '../graphql/queries'
import client from '../lib/apollo'

type Props = {
  products: ProductDto[]
}

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

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { data } = await client.query({
//     query: AllProductsQuery
//   })

//   return {
//     props: {
//       products: data.products
//     },
//   }
// }

export default Home

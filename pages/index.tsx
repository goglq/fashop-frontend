import { useQuery } from '@apollo/client'
import IndexLayout from '../components/IndexLayout'
import ProductList from '../components/ProductList'
import {
  AllBrandsQuery,
  AllCommercialsQuery,
  CountProductsQuery,
  RandomProductsQuery,
} from '../graphql/queries'
import ProductCard from '../components/ProductCard'
import LargeCommercialCard from '../components/LargeCommercialCard'
import BrandCard from '../components/BrandCard'
import { ProductDto } from '../dtos/ProductDto'
import { BrandDto } from '../dtos/BrandDto'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const Home = () => {
  const productsQuery = useQuery(CountProductsQuery, {
    variables: { count: 20 },
  })

  const brandsQuery = useQuery(AllBrandsQuery)

  const randomQuery = useQuery(RandomProductsQuery, {
    variables: { count: 14 },
  })

  const commercialsQuery = useQuery(AllCommercialsQuery)

  useEffect(() => {
    brandsQuery.refetch()
    productsQuery.refetch()
    randomQuery.refetch()
  }, [])

  if (productsQuery.loading) return <p>Loading...</p>

  if (productsQuery.error) return <p>ERROR: {productsQuery.error.message}</p>

  return (
    <div>
      <div className="space-y-10 pb-10">
        <div className="space-y-2">
          <span className="text-2xl font-medium">Новые товары</span>
          <ProductList products={productsQuery.data.products.nodes} />
        </div>
        {commercialsQuery.loading ? (
          <Loading />
        ) : commercialsQuery.error ? (
          <div>error</div>
        ) : (
          <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 h-120 md:h-64">
            <LargeCommercialCard
              img={commercialsQuery.data.commercials.nodes[0]?.url}
            />
            <LargeCommercialCard
              img={commercialsQuery.data.commercials.nodes[1]?.url}
            />
          </div>
        )}
        <div className="space-y-2">
          <span className="text-2xl font-medium">Возможно вам понравится</span>
          <div className="grid grid-rows-2 grid-cols-7 gap-7">
            {randomQuery.data &&
              randomQuery.data.randomProducts.nodes.map(
                (product: ProductDto) => (
                  <ProductCard key={product.id} product={product} />
                )
              )}
          </div>
        </div>
        {commercialsQuery.loading ? (
          <Loading />
        ) : commercialsQuery.error ? (
          <div>error</div>
        ) : (
          <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 h-120 md:h-64">
            <LargeCommercialCard
              img={commercialsQuery.data.commercials.nodes[2]?.url}
            />
            <LargeCommercialCard
              img={commercialsQuery.data.commercials.nodes[3]?.url}
            />
          </div>
        )}
        <div className="space-y-5">
          <span className="text-2xl font-medium">Бренды</span>
          <div className="grid grid-cols-7 gap-8">
            {brandsQuery.loading
              ? 'loading'
              : brandsQuery.data.brands.map((brand: BrandDto) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Home.PageLayout = IndexLayout

export default Home

import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CommonLayout from '../components/CommonLayout'
import { ProductDto } from '../dtos/ProductDto'
import { SearchProductsQuery } from '../graphql/queries'

const SearchPage = () => {
  const router = useRouter()

  const { search } = router.query

  const { data, loading, error } = useQuery(SearchProductsQuery, {
    variables: { text: search },
  })

  if (error) return <div>{error.message}</div>

  return (
    <div className="flex flex-col py-5 space-y-5">
      {data === undefined}
      {data &&
        data.products.map((product: ProductDto) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="grid grid-cols-6 p-3 rounded-xl bg-fashop-4 overflow-hidden cursor-pointer transform transition hover:scale-102">
              <img
                className="w-48 h-48 object-contain rounded-md"
                src={product.productImages[0].url}
                alt={product.name}
              />
              <div className="col-span-3 space-y-2">
                <h2 className="text-4xl text-white font-bold">
                  {product.name}
                </h2>
                <p className="h-36 w-180 text-white font-medium text-ellipsis overflow-hidden">
                  {product.description}
                </p>
              </div>
              <div className="col-start-6 justify-self-end pr-10">
                <p className="text-4xl text-white font-medium">
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

SearchPage.PageLayout = CommonLayout

export default SearchPage

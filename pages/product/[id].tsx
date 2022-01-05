import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import ProductImageCarousel from '../../components/ProductCarousel'
import { ProductDto, ProductWithBrandDto } from '../../dtos/ProductDto'
import {
  AllProductsQuery,
  getProductWithBrandQuery,
} from '../../graphql/queries'
import apolloClient from '../../lib/apollo'

type Props = {
  product: ProductWithBrandDto
}

const ProductPage = ({ product }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>loading</div>
  }

  return (
    <div className="bg-pink-100 rounded-xl h-rel-screen m-5">
      <div className="p-10 space-y-10">
        <div className="flex justify-between ml-10">
          <div className="flex space-x-2 text-4xl font-bold">
            <Link href="/">
              <a className="px-3 rounded-md bg-white">{product.brand.name}</a>
            </Link>
            <h2>{product.name}</h2>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
          </svg>
        </div>
        <div className="grid grid-cols-2 ml-10">
          <ProductImageCarousel productImages={product.productImages} />
          <div className="flex flex-col space-y-8">
            <span className="text-4xl font-bold">${product.price}</span>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-md bg-blue-300 text-xl text-white font-extrabold">
                Добавить в корзину
              </button>
              <button className="p-4 rounded-md bg-pink-400 text-xl text-white font-extrabold">
                Экспресс покупка
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 ml-10 pr-32">
          <div className="space-y-5">
            <span className="text-4xl font-bold">Описание</span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productIds = await apolloClient.query({
    query: AllProductsQuery,
  })

  const paths = productIds.data.products.map((productId: ProductDto) => ({
    params: { id: productId.id.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const { data } = await apolloClient.query({
    query: getProductWithBrandQuery(id),
  })

  return {
    props: {
      product: data.product,
    },
    revalidate: 5,
  }
}

export default ProductPage

import { useMutation } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useAppSelector } from '../../app/hooks'
import CommonFullLayout from '../../components/CommonFullLayout'
import Loading from '../../components/Loading'
import ProductImageCarousel from '../../components/ProductCarousel'
import { ProductDto, ProductWithBrandDto } from '../../dtos/ProductDto'
import { AddCartMutation } from '../../graphql/cart'
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

  const [addCartFunction, { data, loading, error }] =
    useMutation(AddCartMutation)

  const isAuth = useAppSelector((state) => state.user.isAuth)

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )
  }

  if (loading) return <div>loading</div>

  if (error) return <div>{error.message}</div>

  return (
    <div className="bg-pink-100 rounded-xl h-rel-screen m-5 cursor-default">
      <div className="p-10 space-y-10">
        <div className="flex justify-between ml-10">
          <div className="flex items-center space-x-5 text-4xl font-bold">
            <Link href={`/brand/${product.brand.id}`}>
              <a className="p-3 rounded-md bg-fashop-1 text-white transform transition hover:scale-105 ease-in-out">
                {product.brand.name}
              </a>
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
            <span className="text-4xl font-bold">{product.price} &#8381;</span>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="p-4 rounded-md bg-fashop-2 text-xl text-white font-bold transform transition hover:scale-102 ease-in-out"
                onClick={(e) => {
                  e.preventDefault()
                  if (!isAuth) {
                    router.push('/auth/login')
                    return
                  }

                  addCartFunction({
                    variables: { count: 1, productId: product.id },
                  })
                }}
              >
                Добавить в корзину
              </button>
              {/* <button className="p-4 rounded-md bg-pink-400 text-xl text-white font-extrabold">
                Экспресс покупка
              </button> */}
            </div>
            <div className="space-y-5">
              <span className="text-4xl font-bold">Описание</span>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 ml-10 pr-32"></div>
      </div>
    </div>
  )
}

ProductPage.PageLayout = CommonFullLayout

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productIds = await apolloClient.query({
    query: AllProductsQuery,
  })

  const paths = productIds.data.products.nodes.map((productId: ProductDto) => ({
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

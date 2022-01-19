import { useQuery } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import CommonLayout from '../../components/CommonLayout'
import Loading from '../../components/Loading'
import ProductList from '../../components/ProductList'
import { BrandDto } from '../../dtos/BrandDto'
import {
  BrandIdsQuery,
  BrandProductsQuery,
  BrandQuery,
  BrandSaleProductsQuery,
} from '../../graphql/queries'
import apolloClient from '../../lib/apollo'

type Props = {
  brand: BrandDto
}

const BrandPage = ({ brand }: Props) => {
  const router = useRouter()

  const BrandProducts = useQuery(BrandProductsQuery, {
    variables: { brandId: brand.id },
  })

  const BrandSaleProducts = useQuery(BrandSaleProductsQuery, {
    variables: { brandId: brand.id },
  })

  if (router.isFallback || BrandProducts.loading || BrandSaleProducts.loading) {
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )
  }

  if (BrandProducts.error) return <div>{BrandProducts.error.message}</div>
  if (BrandSaleProducts.error)
    return <div>{BrandSaleProducts.error.message}</div>

  return (
    <div className="space-y-5">
      <div className="rounded-lg overflow-hidden">
        <img className="w-full" src={brand.brandImage.header} alt="" />
      </div>
      <div className="space-y-3">
        <div className="ml-1 text-2xl font-medium">Товары</div>
        <ProductList products={BrandProducts.data.products.nodes}></ProductList>
      </div>
      <div className="space-y-3 pb-10">
        <div className="ml-1 text-2xl font-medium">Скидки</div>
        <ProductList
          products={BrandSaleProducts.data.products.nodes}
        ></ProductList>
      </div>
    </div>
  )
}

BrandPage.PageLayout = CommonLayout

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const brandsIds = await apolloClient.query({
    query: BrandIdsQuery,
  })

  const paths = brandsIds.data.brands.map((brand: BrandDto) => ({
    params: { id: brand.id.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const { data } = await apolloClient.query({
    query: BrandQuery,
    variables: { id: parseInt(id) },
  })

  return {
    props: {
      brand: data.brand,
    },
    revalidate: 5,
  }
}

export default BrandPage

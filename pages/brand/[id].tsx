import { useLazyQuery, useQuery } from '@apollo/client'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'
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

  const [getBrandProducts, BrandProducts] = useLazyQuery(BrandProductsQuery)
  const [getBrandSaleProducts, BrandSaleProducts] = useLazyQuery(
    BrandSaleProductsQuery
  )

  useEffect(() => {
    if (brand) {
      getBrandProducts({ variables: { brandId: brand.id } })
      getBrandSaleProducts({ variables: { brandId: brand.id } })
    }
  }, [brand])

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )
  }

  if (!BrandProducts.data || !BrandSaleProducts.data)
    return <div>brand undefined</div>

  return (
    <div className="space-y-5">
      <div className="rounded-lg overflow-hidden">
        <img className="h-48 w-full" src={brand.brandImage.header} alt="" />
      </div>
      <div className="space-y-3">
        <div className="ml-1 text-2xl font-medium">Товары</div>
        {BrandProducts.error && <div>{BrandProducts.error.message}</div>}
        {BrandProducts.loading && <Loading />}
        {BrandProducts.data && (
          <ProductList
            products={BrandProducts.data.products.nodes}
          ></ProductList>
        )}
      </div>
      <div className="space-y-3 pb-10">
        <div className="ml-1 text-2xl font-medium">Скидки</div>
        {BrandSaleProducts.error && (
          <div>{BrandSaleProducts.error.message}</div>
        )}
        {BrandSaleProducts.loading && <Loading />}
        {BrandSaleProducts.data && (
          <ProductList
            products={BrandSaleProducts.data.products.nodes}
          ></ProductList>
        )}
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
    revalidate: 10,
  }
}

export default BrandPage

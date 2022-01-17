import { gql } from '@apollo/client'

export const AllProductsQuery = gql`
  query {
    products(order: { id: DESC }) {
      id
      name
      price
      productImages {
        id
        url
      }
    }
  }
`

export const BrandProductsQuery = gql`
  query BrandProducts($brandId: Int!) {
    products(where: { brandId: { eq: $brandId } }) {
      id
      name
      price
      productImages {
        id
        url
      }
    }
  }
`

export const SearchProductsQuery = gql`
  query SearchProducts($text: String!) {
    products(where: { name: { contains: $text } }) {
      id
      name
      price
      description
      productImages {
        id
        url
      }
    }
  }
`

export const AllProductsWithCategoriesQuery = gql`
  query {
    products {
      id
      name
      categories {
        id
        name
      }
    }
  }
`

export const getProductWithBrandQuery = (id: string) => gql`
query {
  product(id: ${id}) {
    id
    name
    price
    description
    productImages {
      id,
      url
    }
    brand {
      id
      name
    }
  }
}
`

export const AllCatagoriesQuery = gql`
  query {
    categories {
      id
      name
    }
  }
`

export const AllCategoriesWithProductsQuery = gql`
  query {
    categories {
      id
      name
      products {
        id
        name
      }
    }
  }
`

export const AllBrandsQuery = gql`
  query {
    brands {
      id
      name
      brandImage {
        id
        thumbnail
        header
      }
    }
  }
`

export const BrandIdsQuery = gql`
  query {
    brands {
      id
    }
  }
`

export const BrandQuery = gql`
  query BrandQuery($id: Int!) {
    brand(id: $id) {
      id
      name
      brandImage {
        id
        header
        thumbnail
      }
    }
  }
`

export const GetTokenQuery = gql`
  query {
    accessToken
  }
`

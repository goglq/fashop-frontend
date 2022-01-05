import { gql } from '@apollo/client'

export const AllProductsQuery = gql`
  query {
    products {
      id
      name
      price
      productImages {
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
    }
  }
`

export const GetTokenQuery = gql`
  query {
    accessToken
  }
`

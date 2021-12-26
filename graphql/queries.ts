import { gql } from '@apollo/client'

export const AllProductsQuery = gql`
  query {
    products {
      id
      name
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

export const GetTokenQuery = gql`
  query {
    accessToken
  }
`

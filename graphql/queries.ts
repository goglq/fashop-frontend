import { gql } from '@apollo/client'

export const CountProductsQuery = gql`
  query AllProducts($count: Int!) {
    products(order: { id: DESC }, first: $count) {
      nodes {
        id
        name
        price
        sale
        productImages {
          id
          url
        }
      }
    }
  }
`

export const AllProductsQuery = gql`
  query AllProducts {
    products(order: { id: DESC }) {
      nodes {
        id
        name
        price
        sale
        productImages {
          id
          url
        }
      }
    }
  }
`

export const RandomProductsQuery = gql`
  query RandomProductsQuery($count: Int!) {
    randomProducts(first: $count) {
      nodes {
        id
        name
        price
        sale
        productImages {
          id
          url
        }
      }
    }
  }
`

export const BrandProductsQuery = gql`
  query BrandProducts($brandId: Int!) {
    products(where: { brandId: { eq: $brandId } }) {
      nodes {
        id
        name
        price
        sale
        productImages {
          id
          url
        }
      }
    }
  }
`

export const BrandSaleProductsQuery = gql`
  query BrandSaleProducts($brandId: Int!) {
    products(where: { brandId: { eq: $brandId }, and: { sale: { gt: 0 } } }) {
      nodes {
        id
        name
        price
        sale
        productImages {
          id
          url
        }
      }
    }
  }
`

export const SearchProductsQuery = gql`
  query SearchProducts($text: String!) {
    searchProducts(text: $text) {
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

export const AllCommercialsQuery = gql`
  query {
    commercials {
      nodes {
        id
        url
      }
    }
  }
`

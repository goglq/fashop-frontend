import { gql } from '@apollo/client'

export const CreateProductMutation = gql`
  mutation CreateProduct(
    $name: String!
    $price: Decimal!
    $sale: Int!
    $brandId: Int!
    $categoryIds: [Int!]!
    $description: String!
    $imageUrls: [String]!
  ) {
    addProduct(
      input: {
        name: $name
        price: $price
        sale: $sale
        brandId: $brandId
        categoryIds: $categoryIds
        descriptions: $description
        imageUrls: $imageUrls
      }
    ) {
      product {
        id
        name
        brand {
          id
          name
        }
        categories {
          id
          name
        }
      }
    }
  }
`

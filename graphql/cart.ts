import { gql } from '@apollo/client'

export const AddCartMutation = gql`
  mutation AddCart($count: Int!, $productId: Int!) {
    addCart(input: { count: $count, productId: $productId }) {
      cart {
        id
        userId
        productId
      }
    }
  }
`

export const DeleteCartMutation = gql`
  mutation DeleteCart($id: Int!) {
    deleteCart(id: $id) {
      cartId
    }
  }
`

export const GetUserCartsQuery = gql`
  query {
    userCarts {
      id
      count
      product {
        id
        name
        price
        productImages {
          id
          url
        }
      }
    }
  }
`

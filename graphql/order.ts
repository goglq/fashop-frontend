import { gql } from '@apollo/client'

export const AddOrderMutation = gql`
  mutation AddOrder($address: String!, $cartIds: [String]!) {
    addOrder(input: { address: $address, cartIds: $cartIds }) {
      order {
        user {
          id
          email
        }
        address
      }
    }
  }
`

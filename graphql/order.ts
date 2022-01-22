import { gql } from '@apollo/client'

export const AddOrderMutation = gql`
  mutation AddOrder($address: String!) {
    addOrder(input: { address: $address }) {
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

export const GetUserOrdersQuery = gql`
  query {
    userOrders {
      id
      address
      totalPrice
      status {
        id
        name
      }
    }
  }
`

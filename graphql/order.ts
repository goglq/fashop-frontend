import { gql } from '@apollo/client'

export const AddOrderMutation = gql`
  mutation AddOrder(
    $city: String!
    $street: String!
    $building: String!
    $section: String
    $housing: String
    $postIndex: String!
    $name: String!
    $surname: String!
  ) {
    addOrder(
      input: {
        city: $city
        street: $street
        building: $building
        section: $section
        housing: $housing
        postIndex: $postIndex
        name: $name
        surname: $surname
      }
    ) {
      order {
        user {
          id
          email
        }
        city
        street
        building
        section
        housing
        name
        surname
        totalPrice
      }
    }
  }
`

export const GetUserOrdersQuery = gql`
  query {
    userOrders {
      id
      city
      street
      building
      section
      housing
      postIndex
      totalPrice
      status {
        id
        name
      }
    }
  }
`

import { gql } from '@apollo/client'

export const CreateBrandMutation = gql`
  mutation CreateBrand($name: String!, $thumbnail: String!, $header: String!) {
    addBrand(input: { name: $name, thumbnail: $thumbnail, header: $header }) {
      brand {
        id
        name
        brandImage {
          id
          thumbnail
          header
        }
      }
    }
  }
`

export const GetUserBrandsQuery = gql`
  query {
    userBrands {
      id
      name
    }
  }
`

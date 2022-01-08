import { gql } from '@apollo/client'

export const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`

export const LogoutMutation = gql`
  mutation Logout {
    logout {
      userId
    }
  }
`

export const RegisterMutation = gql`
  mutation Register($email: String!, $password: String!) {
    registerUser(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

export const GetSelf = gql`
  query {
    self {
      id
      email
      isEmailVerified
    }
  }
`

import { ApolloClient, InMemoryCache } from '@apollo/client'

const API_URL = process.env.NEXT_PUBLIC_API_URL

console.log(API_URL)

const apolloClient = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
})

export default apolloClient

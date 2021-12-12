import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'https://localhost:5001/graphql',
  cache: new InMemoryCache(),
})

export default apolloClient

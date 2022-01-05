import {
  ApolloClient,
  ApolloQueryResult,
  ApolloLink,
  DocumentNode,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  fromPromise,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GetTokenQuery } from '../graphql/queries'

const API_URL = process.env.NEXT_PUBLIC_API_URL

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    if (typeof window === undefined) {
      headers = {
        ...headers,
        authorization: localStorage.getItem('token') || null,
      }
    } else {
      headers = {
        ...headers,
      }
    }

    return {
      headers,
    }
  })

  return forward(operation)
})

const getNewToken = () => {
  return apolloClient
    .query({
      query: GetTokenQuery,
    })
    .then((response) => {
      // extract your accessToken from your response data and return it
      const { accessToken } = response.data
      localStorage.setItem('token', accessToken)
      return accessToken
    })
}

const onNotAuthenticated = onError(({ operation, graphQLErrors, forward }) => {
  if (
    graphQLErrors?.find(
      (graphQLError) =>
        graphQLError.extensions.code === 'AUTH_NOT_AUTHENTICATED'
    )
  ) {
    return fromPromise(
      getNewToken().catch((error) => {
        // Handle token refresh errors e.g clear stored tokens, redirect to login
        localStorage.removeItem('token')
        return error
      })
    )
      .filter((value) => Boolean(value))
      .flatMap((accessToken) => {
        const oldHeaders = operation.getContext().headers
        // modify the operation context with a new token
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `Bearer ${accessToken}`,
          },
        })

        // retry the request, returning the new observable
        return forward(operation)
      })
  }
})

apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, onNotAuthenticated, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default apolloClient

export const fetchQuery = async (
  query: DocumentNode
): Promise<ApolloQueryResult<any>> => {
  try {
    const result = await apolloClient.query({
      query: query,
    })

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message)
    }

    return result
  } catch (error) {
    throw error
  }
}

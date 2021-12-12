import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ComponentType } from 'react'

import { UserProvider } from '@auth0/nextjs-auth0'
import { ApolloProvider } from '@apollo/client'

import apolloClient from '../lib/apollo'
import Header from '../components/Header'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: ComponentType
  }
}

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Header />
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp

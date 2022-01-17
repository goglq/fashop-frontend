import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ComponentType } from 'react'

import { ApolloProvider } from '@apollo/client'
import store from '../app/store'

import apolloClient from '../lib/apollo'
import { Provider } from 'react-redux'
import AuthWrapper from '../components/AuthWrapper'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: ComponentType
  }
}

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <AuthWrapper>
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthWrapper>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp

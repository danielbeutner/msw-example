/* eslint-env node, jest */
import React from 'react'
import { render as renderFn } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import {
  GraphqlProvider,
  createGraphqlClient,
  clientOptions
} from '../graphql'

// Disable the cache for Jest
const defaultGraphqlClient = createGraphqlClient({
  ...clientOptions,
  requestPolicy: 'network-only'
})

function Providers ({ children, graphqlClient = defaultGraphqlClient }) {
  return (
    <React.StrictMode>
      <GraphqlProvider value={graphqlClient}>{children}</GraphqlProvider>
    </React.StrictMode>
  )
}

/**
 * 
 * @param {*} ui 
 * @param {Object} options - Some custom options to enhance tests
 * @param {Object} options.graphqlClient - A custom graphql client to use in the Provider
 */
function render (ui, options = {}) {
  const { graphqlClient } = options

  return renderFn(ui, {
    wrapper: graphqlClient
      ? ({ children }) => Providers({ children, graphqlClient })
      : Providers,
    options
  })
}

export * from '@testing-library/react'
export { render, renderHook }

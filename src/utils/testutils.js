import React from 'react'
import { render as renderFn } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { GraphqlProvider, graphqlClient } from '../graphql'

function Providers({ children }) {
  return (
    <React.StrictMode>
      <GraphqlProvider value={graphqlClient}>
        {children}
      </GraphqlProvider>
    </React.StrictMode>
  )
}

function render(ui, options = {}) {
  return renderFn(ui, { wrapper: Providers, options })
}

export * from '@testing-library/react'
export { render, renderHook }
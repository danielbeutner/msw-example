import { createClient, defaultExchanges, Provider } from 'urql'
import { onPush, pipe } from 'wonka'

// List of all urql plugins
// urql calls them "exchanges"
const mergedExchanges = []

if (process.env.NODE_ENV !== 'production') {
  const { devtoolsExchange } = require('@urql/devtools')

  mergedExchanges.push(devtoolsExchange)
}

/**
 * @description Exchange for urql to handle errors
 * @param onError
 */
const errorExchange = (onError) => ({
  forward,
}) => {
  return operations$ =>
    pipe(
      forward(operations$),
      onPush(result => {
        // This could also be more specific and check for `!result.data`, etc
        if (result.error) {
          onError(result.error)
        }
      })
    )
}

// Add error handling to plugin list
mergedExchanges.push(errorExchange(handleError))

// Add default exchanges
mergedExchanges.push(...defaultExchanges)

/**
 * @description Extracts a authorization token (JWT) from local storage if possible
 * @returns Empty string or Bearer with JWT as string
 */
function getToken() {
  try {
    const jwt = window.localStorage.getItem('authorization')

    return jwt ? `Bearer ${jwt}` : ''
  } catch (error) {
    return ''
  }
}

/**
 * @returns Returns fetch options
 */
function getFetchOptions() {
  return {
    headers: {
      Authorization: getToken(),
    },
  }
}

/**
 * @description Called on error
 * @param error
 */
function handleError(error) {
  // @TODO: Implement error handling here!
}

// Options for urql
export const clientOptions = {
  url: 'https://localhost:9000/graphql',
  fetchOptions: () => getFetchOptions(),
  exchanges: mergedExchanges,
}

// In case you need to modify the client's options you can import this
// Exmaple usage in ./.storybook/preview.js (disabled caching)
export const createGraphqlClient = createClient

// Create urql client with predefined options
export const graphqlClient = createClient(clientOptions)

// Provider for urql
export const GraphqlProvider = Provider

const { addDecorator } = require('@storybook/react')
const { createGraphqlClient, clientOptions, GraphqlProvider } = require('../src/graphql')
const { graphql, rest } = require('msw')
const faker = require('faker')
const React = require('react')

// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser')
  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker.start()

  // Inject mock utils into global windo object for storybook
  window.msw = {
    faker,
    graphql,
    rest,
    worker,
  }
}

// Disable the cache for Storybook
const graphqlClient = createGraphqlClient({
  ...clientOptions,
  requestPolicy: 'network-only'
})

// Adding Graphql Provider
addDecorator(story => (
  <GraphqlProvider value={graphqlClient}>{story()}</GraphqlProvider>
))
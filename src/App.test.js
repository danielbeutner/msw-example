/* eslint-env node, jest */
import React from 'react'
import { render, waitFor, screen } from './utils/test'
import { server } from './mocks/server'
import { graphql, rest } from 'msw'
import App from './App'

/**
 * Renders a component
 * @param {Function} responseFn Response callback for msw server
 * @param {Object} options - Some custom options to enhance tests
 */
function renderComponent (responseOverride, options) {
  if (responseOverride) {
    server.use(responseOverride)
  }

  return render(<App />, options)
}

describe('App', () => {
  test('renders headline', async () => {
    renderComponent()

    expect(screen.getByText(/msw example/i)).toBeInTheDocument()
  })

  test('renders graphql headline', async () => {
    renderComponent()

    expect(screen.getByText(/graphql/i)).toBeInTheDocument()
  })

  test('renders rest headline', async () => {
    renderComponent()

    expect(screen.getByText(/rest/i)).toBeInTheDocument()
  })

  describe('graphql', () => {
    test('renders post list in graphql column', async () => {
      renderComponent()

      await waitFor(() => {
        return expect(screen.getAllByRole('article')).toHaveLength(200)
      })
    })

    test('renders graphql error', async () => {
      renderComponent(
        graphql.query('Posts', (req, res, ctx) => {
          return res.once(
            ctx.status(400, 'Bad Request'),
            ctx.errors([
              {
                message: 'Failed request: Unknown reason',
                locations: []
              }
            ])
          )
        })
      )

      await waitFor(() => {
        return expect(screen.getByText(/Unknown reason/i)).toBeInTheDocument()
      })
    })
  })

  describe('rest', () => {
    test('renders not found error', async () => {
      renderComponent(
        rest.get('/posts', (req, res, ctx) => {
          return res.once(
            ctx.status(404, 'Not found'),
            ctx.json({ message: 'Not found' })
          )
        })
      )

      await waitFor(() => {
        return expect(screen.getByText(/Not found/i)).toBeInTheDocument()
      })
    })
  })
})

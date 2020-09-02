import React from 'react'
import { render, waitFor } from './utils/testutils'
import { server } from './mocks/server'
import { graphql, rest } from 'msw'
import App from './App'

/**
 * Renders a component
 * @param {Function} responseFn Response callback for msw server
 */
function renderComponent(responseOverride) {
  if (responseOverride) {
    server.use(responseOverride)
  }

  return render(<App />)
}

describe('App', () => {
  test('renders headline', async () => {
    const { getByText } = renderComponent()
    const element = getByText(/msw example/i)

    expect(element).toBeInTheDocument()
  })

  test('renders graphql headline', async () => {
    const { getByText } = renderComponent()
    const element = getByText(/graphql/i)

    expect(element).toBeInTheDocument()
  })

  test('renders rest headline', async () => {
    const { getByText } = renderComponent()
    const element = getByText(/rest/i)

    expect(element).toBeInTheDocument()
  })

  describe('graphql', () => {
    test('renders post list in graphql column', async () => {
      const { getAllByRole } = renderComponent()
  
      await waitFor(() => {
        const element = getAllByRole('article')
  
        return expect(element).toHaveLength(200)
      })
    })
  
    test('renders graphql error', async () => {
      const { getByText } = renderComponent(
        graphql.query('Posts', (req, res, ctx) => {
          return res.once(
            ctx.status(400, 'Bad Request'),
            ctx.errors([
              {
                message: 'Failed request: Unknown reason',
                locations: [],
              },
            ])
          )
        })
      )
  
      await waitFor(() => {
        return expect(getByText(/Unknown reason/i)).toBeInTheDocument()
      })
    })
  })

  describe('rest', () => {
    test('renders not found error', async () => {
      const { getByText } = renderComponent(
        rest.get('/posts', (req, res, ctx) => {
          return res.once(
            ctx.status(404, 'Not found'),
            ctx.json({ message: 'Not found' })
          )
        })
      )
  
      await waitFor(() => {
        return expect(getByText(/Not found/i)).toBeInTheDocument()
      })
    })
  })


})





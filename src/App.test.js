import React from 'react'
import { render } from './utils/testutils'
import App from './App'

describe('App', () => {
  test('renders headline', () => {
    const { getByText } = render(<App />)
    const headlineElement = getByText(/Storybook msw example/i)
  
    expect(headlineElement).toBeInTheDocument()
  })
})





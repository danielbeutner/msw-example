// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'jest-localstorage-mock'
import { server } from './mocks/server'

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen()
})

afterEach(() => {
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up after the tests are finished.
  server.close()
})

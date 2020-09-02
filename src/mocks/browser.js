import { rest, setupWorker } from 'msw'
import { handlers } from './handlers'
import faker from 'faker'
export const worker = setupWorker(...handlers)

// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
window.msw = {
  worker,
  rest,
  faker
}

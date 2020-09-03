import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { GraphqlProvider, graphqlClient } from './graphql'

function renderApp() {
  return ReactDOM.render(
    <React.StrictMode>
      <GraphqlProvider value={graphqlClient}>
        <App />
      </GraphqlProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV === 'development') {
  // If you end up with a component that fetches on mount, 
  // this ensures that `msw` has started and prevents
  // a possible race condition for some users/browsers
  const { worker } = require('./mocks/browser')
  worker.start().then(() => renderApp())
} 

renderApp();
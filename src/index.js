import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { GraphqlProvider, graphqlClient } from './graphql'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <GraphqlProvider value={graphqlClient}>
      <App />
    </GraphqlProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

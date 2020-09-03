import React from 'react'
import './App.css'
import PostListRest from './PostListRest'
import PostListGraphql from './PostListGraphql'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Msw example</h1>
      </header>
      <main className='App-main'>
        <section>
          <h2>Graphql</h2>
          <PostListGraphql />
        </section>
        <section>
          <h2>REST</h2>
          <PostListRest />
        </section>
      </main>
    </div>
  )
}

export default App

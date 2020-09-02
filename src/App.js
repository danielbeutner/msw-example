import React from 'react'
import './App.css'
import PostList from './PostList'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Storybook msw example</h1>
      </header>
      <main className='App-main'>
        <PostList />
      </main>
    </div>
  )
}

export default App

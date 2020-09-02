import React from 'react'
import PostList from '../PostList'

export default {
  title: 'PostList',
  component: PostList
}

export function Posts () {
  return <PostList />
}

export function PostsNotFound () {
  const { worker, rest } = window.msw

  worker.use(
    rest.get('/posts', (req, res, ctx) => {
      res.once(
        ctx.status(404),
        ctx.json({ message: 'Not found' })
      )
    })
  )

  return <PostList />
}

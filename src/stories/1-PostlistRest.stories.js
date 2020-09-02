import React from 'react'
import PostListRest from '../PostListRest'

export default {
  title: 'PostListRest',
  component: PostListRest
}

export function PostsRest () {
  return <PostListRest />
}

export function PostsRestNotFound () {
  const { worker, rest } = window.msw

  worker.use(
    rest.get('/posts', (req, res, ctx) => {
      return res.once(
        ctx.status(404, 'Not found'),
        ctx.json({ message: 'Not found' })
      )
    })
  )

  return <PostListRest />
}

export function PostsRestNoPosts () {
  const { worker, rest } = window.msw

  worker.use(
    rest.get('/posts', (req, res, ctx) => {
      return res.once(
        ctx.status(200),
      ctx.json({ items: [], total: 0 })
      )
    })
  )

  return <PostListRest />
}

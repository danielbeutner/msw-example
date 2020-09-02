import React from 'react'
import PostListGraphql from '../PostListGraphql'

export default {
  title: 'PostListGraphql',
  component: PostListGraphql
}

export function PostsGraphql () {
  return <PostListGraphql />
}

export function PostsGraphqlNotFound () {
  const { worker, graphql } = window.msw

  worker.use(
    graphql.query('/posts', (req, res, ctx) => {
      return res.once(
        ctx.errors({
          message: 'Not found',
          location: []
        }),
      )
    })
  )

  return <PostListGraphql />
}

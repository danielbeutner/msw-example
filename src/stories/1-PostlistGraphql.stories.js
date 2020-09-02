import React from 'react'
import PostListGraphql from '../PostListGraphql'

export default {
  title: 'PostListGraphql',
  component: PostListGraphql
}

export function PostsGraphql () {
  return <PostListGraphql />
}

export function PostsGraphqlFailure () {
  const { worker, graphql } = window.msw

  worker.use(
    graphql.query('Posts', (req, res, ctx) => {
      return res.once(
        ctx.status(400, 'Bad Request'),
        ctx.errors([
          {
            message: 'Failed request: Unknown reason',
            locations: [],
          },
        ])
      )
    })
  )

  return <PostListGraphql />
}

export function PostsGraphqlNoPosts () {
  const { worker, graphql } = window.msw

  // No items
  worker.use(
    graphql.query('Posts', (req, res, ctx) => {
      return res.once(
        ctx.data({
          postItems: {
            // edges: [],
            pageInfo: {
              endCursor: null,
              hasNextPage: false,
            }
          }
  
        })
      )
    })
  )

  return <PostListGraphql />
}
import React from 'react'
import { useQuery } from 'urql'

function hasPosts(data) {
  return data && data.postItems && data.postItems && data.postItems.edges && data.postItems.edges.length !== 0
}

function PostList() {
  const [{ data, fetching, error }] = useQuery({
    query: `
      query Posts($first: Int, $after: String) {
        postItems(first: $first, after: $after) {
          edges {
            node {
              id
              title
              body
            }
          }
        }
      }
    `
  })
  
  // Catch and show the error
  if (error && error.message) {
    return <p>{error.message}</p>
  }

  // Show loading state
  if (fetching) {
    return <p>Loading...</p>
  }

  // Show message if we get an empty list
  if (!fetching && !hasPosts(data)) {
    return <p>Oh snap. No posts yet!</p>
  }

  return data.postItems.edges.map(
    ({ node }) => (
      <article key={node.id}>
        <h2>{node.title}</h2>
        <p>{node.body}</p>
      </article>
    )
  )
}

export default PostList

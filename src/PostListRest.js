import React, { useEffect, useState } from 'react'

function PostListRest () {
  const [url] = useState('/posts')
  const [posts, setPosts] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelFetch = false

    const fetchPosts = async () => {
      

      setIsLoading(true)

      try {
        const response = await window.fetch(url)

        if(cancelFetch) return

        if (!response.ok) {
          setError({
            code: response.status,
            message: response.statusText
          })
        }

        const { items } = await response.json()

        if (response.ok && items.length > 0) {
          setPosts(items)
        }
      } catch (error) {
        setError(error)
      }

      setIsLoading(false)
    }

    fetchPosts()

    return () => {
      cancelFetch = true
    }
  }, [url])

  // Catch and show the error
  if (error && error.message) {
    return <p>{error.message}</p>
  }

  // Show loading state
  if (isLoading) {
    return <p>Loading...</p>
  }

  // Show message if we get an empty list
  if (!isLoading && !posts) {
    return <p>Oh snap. No posts yet!</p>
  }

  return posts.map(
    (post) => (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </article>
    )
  )
}

export default PostListRest

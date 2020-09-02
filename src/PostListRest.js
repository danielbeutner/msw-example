import React, { useEffect, useState } from 'react'

function PostList() {
  const [posts, setPosts] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)

      try {
        const response = await fetch('/posts')

        if(response.ok) {
          const { items } = await response.json()

          setPosts(items)
        } else {
          setError({
            code: response.status,
            message: response.statusText
          })
        }
      } catch (error) {
        setError(error)
      }

      setIsLoading(false)
    }

    fetchPosts()
  }, [])

  console.log(posts, error);

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

export default PostList

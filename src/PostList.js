import React, { useEffect, useState } from 'react'

function PostList() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)

            try {
                const response = await fetch('/posts')
                const { data } = await response.json()

                setPosts(data)
            } catch (error) {
                setError(error)
            }

            setIsLoading(false)
        }

        fetchPosts()
    }, [])

    // Catch and show the error
    if (error && error.message) {
        return <p>{error.message}</p>
    }

    // Show loading state
    if (isLoading) {
        return <p>Loading...</p>
    }

    // Show message if we get an empty list
    if (posts && posts.length < 0) {
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

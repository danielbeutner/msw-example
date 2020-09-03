import { rest, graphql } from 'msw'
import faker from 'faker'

/**
 * Generates a list of posts
 * @param {number} length
 * @returns {Function} Returns a function which lists generated posts
 */
function createPostList (length = 100) {
  const posts = []

  for (let index = 0; index < length; index++) {
    posts.push({
      id: faker.random.uuid(),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs()
    })
  }

  return () => {
    return posts
  }
}

const posts = createPostList()

export const handlers = [

  // Rest endpoints
  rest.get('/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ items: posts(), total: 100 })
    )
  }),

  // GrqphQL queries
  graphql.query('Posts', (req, res, ctx) => {
    return res(
      ctx.data({
        postItems: {
          // This adds a cursor to the posts
          edges: posts().map(post => ({
            node: {
              id: post.id,
              title: post.title,
              body: post.body
            },
            cursor: faker.random.alphaNumeric(16)
          })),
          // Additional page info
          pageInfo: {
            endCursor: faker.random.alphaNumeric(16),
            hasNextPage: true
          }
        }

      })
    )
  })
]

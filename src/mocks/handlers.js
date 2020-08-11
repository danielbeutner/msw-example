import { rest } from 'msw'
import faker from 'faker'

const createPostList = (length = 20) => {
    const posts = []

    for (let index = 0; index < length; index++) {
        posts.push({
            id: faker.random.uuid(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(),
        })
    }

    return posts
}

const posts = createPostList()

export const handlers = [
  rest.get('/posts', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({ data: posts }),
    )
  })
];
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/db/db.module'
import { type NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('New Challenge Resolver', () => {
  let app: NestExpressApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('[MUTATION] createChallenge', async () => {
    const mutation = `
      mutation {
        createChallenge(data: {
          title: "New Challenge",
          description: "This is a new challenge description.",
        }) {
          id
          title
          description
          createdAt
        }
      }
    `
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation })

    expect(res.status).toBe(200)
    expect(res.body.data.createChallenge).toMatchObject({
      title: 'New Challenge',
      description: 'This is a new challenge description.',
    })
  })
})
